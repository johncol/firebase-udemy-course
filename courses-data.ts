export const COURSES: any = {
  1: {
    seqNo: 1,
    name: 'MongoDB for Java Developers',
    entity: 'MongoDB University',
    date: '12/09/2015',
    description: 'Learn everything you need to know to get started building a MongoDB-based app',
    credential: 'https://university.mongodb.com/course_completion/a3ae2f16283f4c558c47ad96478895f2',
    image: 'https://miro.medium.com/max/810/1*cHyApW9jNlcPXwlFfd4umw.jpeg',
    status: 'done'
  },
  2: {
    seqNo: 2,
    name: 'Angular',
    entity: 'Udemy',
    date: '07/02/2017',
    description: 'Master Angular (Angular 2+, incl. Angular 8) and build awesome, reactive web apps with the successor of Angular.js',
    credential: 'https://www.udemy.com/certificate/UC-03KG6L78',
    image: 'https://miro.medium.com/max/3492/1*P7x-_0XfQz6CVmMY_QAv0w.png',
    status: 'done'
  },
  3: {
    seqNo: 3,
    name: 'Progressive Web Applications',
    entity: 'Udemy',
    date: '02/04/2018',
    description: 'Build a Progressive Web App (PWA) that feels like an iOS & Android App, using Device Camera, Push Notifications and more',
    credential: 'https://www.udemy.com/certificate/UC-2RONQWXK',
    image: 'https://miro.medium.com/max/1299/1*AhFm0XyjfG7A_ZG5hC-Hyg.png',
    status: 'done'
  },
  4: {
    seqNo: 4,
    name: 'Advanced CSS and SCSS',
    entity: 'Udemy',
    date: '07/18/2018',
    description: 'The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more',
    credential: 'https://www.udemy.com/certificate/UC-Q1JIH4XW',
    image: 'https://el.javier.pro/wp-content/uploads/2016/10/sass-logo-wall.jpg',
    status: 'done'
  },
};

export function findCourseById(courseId: number) {
  return COURSES[courseId];
}
