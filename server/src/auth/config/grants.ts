export const grants = {
  admin: {
    audio: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    job: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    pack: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    paymentplan: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    payment: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    rave: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    review: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    user: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    wishlist: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  user: {
    audio: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    job: {
      'read:any': ['*'],
    },
    pack: {
      'create:own': ['*'],
      'read:any': ['*'],
      'update:own': ['*'],
      'delete:any': ['*'],
    },
    paymentplan: {
      'read:any': ['*'],
    },
    payment: {
      'create:own': ['*'],
      'read:own': ['*'],
    },
    rave: {
      'create:own': ['*'],
      'read:any': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    review: {
      'create:own': ['*'],
      'read:any': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    user: {
      'create:any': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    wishlist: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
  },
};

// resources
// audio: {

// },
// job: {

// },
// pack: {

// },
// paymentplan: {

// },
// payment: {

// },
// rave: {

// },
// review: {

// },
// user: {

// },
// wishlist: {

// }
