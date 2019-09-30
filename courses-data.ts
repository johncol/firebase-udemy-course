export const COURSES: any = {
  1: {
    seqNo: 1,
    name: 'MongoDB for Java Developers',
    url: 'mongodb-for-java-developers',
    entity: 'MongoDB University',
    date: '12/09/2015',
    description: 'Learn everything you need to know to get started building a MongoDB-based app',
    credential: 'https://university.mongodb.com/course_completion/a3ae2f16283f4c558c47ad96478895f2',
    image: 'https://miro.medium.com/max/810/1*cHyApW9jNlcPXwlFfd4umw.jpeg',
    status: 'done',
    repositories: ['https://github.com/johncol/m101j-mongodb-for-java-developers'],
    live: []
  },
  2: {
    seqNo: 2,
    name: 'Angular',
    url: 'angular',
    entity: 'Udemy',
    date: '07/02/2017',
    description: 'Master Angular (Angular 2+, incl. Angular 8) and build awesome, reactive web apps with the successor of Angular.js',
    credential: 'https://www.udemy.com/certificate/UC-03KG6L78',
    image: 'https://miro.medium.com/max/3492/1*P7x-_0XfQz6CVmMY_QAv0w.png',
    status: 'done',
    repositories: [],
    live: []
  },
  3: {
    seqNo: 3,
    name: 'Progressive Web Applications',
    url: 'progressive-web-applications',
    entity: 'Udemy',
    date: '02/04/2018',
    description: 'Build a Progressive Web App (PWA) that feels like an iOS & Android App, using Device Camera, Push Notifications and more',
    credential: 'https://www.udemy.com/certificate/UC-2RONQWXK',
    image: 'https://miro.medium.com/max/1299/1*AhFm0XyjfG7A_ZG5hC-Hyg.png',
    status: 'done',
    repositories: ['https://github.com/johncol/progressive-web-apps-udemy-course'],
    live: []
  },
  4: {
    seqNo: 4,
    name: 'Advanced CSS and SCSS',
    url: 'advanced-css-and-scss',
    entity: 'Udemy',
    date: '07/18/2018',
    description: 'The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more',
    credential: 'https://www.udemy.com/certificate/UC-Q1JIH4XW',
    image: 'https://el.javier.pro/wp-content/uploads/2016/10/sass-logo-wall.jpg',
    status: 'done',
    repositories: [
      'https://github.com/johncol/css-course-nexter',
      'https://github.com/johncol/css-course-trillo',
      'https://github.com/johncol/css-course-natours'
    ],
    live: [
      'https://johncol.github.io/css-course-nexter',
      'https://johncol.github.io/css-course-trillo',
      'https://johncol.github.io/css-course-natours'
    ]
  },
  5: {
    seqNo: 5,
    name: 'React Nanodegree',
    url: 'react-nanodegree',
    entity: 'Udacity',
    date: '10/03/2019',
    description: 'Learn how to build declarative user interfaces for the web with React, and for iOS and Android with React Native. Also learn how to manage state more predictably in your applications with Redux.',
    credential: 'https://graduation.udacity.com/confirm/M5F4L46E',
    image: 'https://miro.medium.com/max/3000/1*TdL2qRmfsOFyaikOI_guow.png',
    status: 'done',
    repositories: [
      'https://github.com/johncol/nano-degree-mobile-flashcards',
      'https://github.com/johncol/nano-degree-fitness-app',
      'https://github.com/johncol/nano-degree-would-you-rather',
      'https://github.com/johncol/nano-degree-chirper-app',
      'https://github.com/johncol/nano-degree-redux',
      'https://github.com/johncol/react-nano-book-tracking-app'
    ],
    live: [
      'https://johncol.github.io/nano-degree-would-you-rather',
      'https://johncol.github.io/react-nano-book-tracking-app'
    ]
  },
  6: {
    seqNo: 6,
    name: 'Web Design for Web Developers',
    url: 'web-design-for-web-developers',
    entity: 'Udemy',
    date: '18/09/2019',
    description: 'Learn web design in 1 hour with 25+ simple-to-use rules and guidelines — tons of amazing web design resources included',
    credential: 'https://www.udemy.com/certificate/UC-2POI50KY',
    image: 'https://secureservercdn.net/166.62.111.64/45c.98b.myftpupload.com/wp-content/uploads/2018/04/Web-Design-Image-1.jpg',
    status: 'done',
    repositories: []
  },
  7: {
    seqNo: 7,
    name: 'Firebase Masterclass',
    url: 'firebase-masterclass',
    entity: 'Udemy',
    date: '28/09/2019',
    description: 'Full-stack Development with Angular 8, Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire',
    credential: 'https://www.udemy.com/certificate/UC-5MVBKHV6',
    image: 'https://firebase.google.com/images/social.png',
    status: 'done',
    repositories: ['https://github.com/johncol/firebase-udemy-course'],
    live: ['https://fir-course-e6097.web.app']
  },
  8: {
    seqNo: 8,
    name: 'Javascript Essentials',
    url: 'javascript-essentials',
    entity: 'Udemy',
    description: 'Learn how Javascript works, some basic API\'s and finally create a mini project.',
    image: 'https://nadia-training.com/wp-content/uploads/2019/03/JavaScript-Essentials-Course.jpg',
    status: 'todo',
    repositories: [],
    live: []
  }
};

export function findCourseById(courseId: number) {
  return COURSES[courseId];
}
