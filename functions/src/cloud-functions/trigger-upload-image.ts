import * as functions from 'firebase-functions';
import * as path from 'path';
import * as os from 'os';
import * as childProcessPromise from 'child-process-promise';
import * as deleteFolder from 'rimraf';
import { Storage, Bucket, File } from '@google-cloud/storage';
const mkdirp = require('mkdirp-promise');

import { firestore } from './../init';

const storage: Storage = new Storage();
const runCommand = childProcessPromise.spawn;

const thumbnailPrefix: string = 'thumb_';

export const resizeImage: functions.CloudFunction<functions.storage.ObjectMetadata> = functions.storage.object()
  .onFinalize(async (object: functions.storage.ObjectMetadata) => {
    const bucketImagePath: string = object.name || '';
    console.log(`Thumbnail generation started: ${bucketImagePath}`);

    const contentType: string = object.contentType || '';
    if (!contentType.startsWith('image')) {
      console.log(`File is not an image; content-types is ${contentType}`);
      return null;
    }

    const bucketPath: string = path.dirname(bucketImagePath);
    const imageName: string = path.basename(bucketImagePath);
    if (imageName.startsWith(thumbnailPrefix)) {
      console.log(`File is already a thumbnail; name is ${imageName}`);
      return null;
    }

    const location: string = path.join(os.tmpdir(), bucketPath);
    await mkdirp(location);

    const bucket: Bucket = storage.bucket(object.bucket);
    const bucketImage: File = bucket.file(bucketImagePath);

    const fileFullPath: string = path.join(location, imageName);
    await bucketImage.download({ destination: fileFullPath });

    const thumbnailName: string = `${thumbnailPrefix}${imageName}`;
    const thumbnailFullPath: string = path.join(location, thumbnailName);

    await runCommand('convert', [fileFullPath, '-thumbnail', '510x287 >', thumbnailFullPath], {
      capture: ['stdout', 'stderr']
    });

    const thumbMetadata: any = {
      contentType,
      cacheControl: 'public,max-age=2592000,s-max=2592000'
    };

    const bucketThumbnailPath: string = path.join(bucketPath, thumbnailName);
    const bucketThumbnail: File = (await bucket.upload(thumbnailFullPath, {
      destination: bucketThumbnailPath,
      metadata: thumbMetadata
    }))[0];

    deleteFolder.sync(location);
    await bucketImage.delete()
    const thumbnailUrl: string = (await bucketThumbnail.getSignedUrl({
      expires: new Date(3000, 1, 1),
      action: 'read'
    }))[0];

    const pathParts: string[] = bucketPath.split('/');
    const courseId: string = pathParts[pathParts.length - 1];

    return firestore
      .doc(`courses/${courseId}`)
      .update({ uploadedImageUrl: thumbnailUrl })
      .then((result: any) => {
        console.log(`Thumbnail generation finished: ${bucketThumbnailPath}`);
        return result;
      });
  })