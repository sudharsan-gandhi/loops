export const grants = {
  admin: {
    loop: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    job: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    pack: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    paymentplan: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    payment: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    rave: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    review: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    user: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
    wishlist: {
      'create:any': '*',
      'read:any': '*',
      'update:any': '*',
      'delete:any': '*',
    },
  },
  user: {
    loop: {
      'create:own': '*',
      'read:any': '*',
      'update:own': '*',
      'delete:own': '*',
    },
    job: {
      'read:any': '*',
    },
    pack: {
      'create:own': '*',
      'read:any': '*',
      'update:own': '*',
      'delete:any': '*',
    },
    paymentplan: {
      'read:any': '*',
    },
    payment: {
      'create:own': '*',
      'read:own': '*',
    },
    rave: {
      'create:own': '*',
      'read:any': '*',
      'update:own': '*',
      'delete:own': '*',
    },
    review: {
      'create:own': '*',
      'read:any': '*',
      'update:own': '*',
      'delete:own': '*',
    },
    user: {
      'create:any': '*, !role',
      'read:own': '*',
      'update:own': '*',
      'delete:own': '*',
    },
    wishlist: {
      'create:own': '*',
      'read:own': '*',
      'update:own': '*',
      'delete:own': '*',
    },
  },
  guest: {
    loop: {
      'read:any': '*',
    },
    job: {
      'read:any': '*',
    },
    pack: {
      'read:any': '*',
    },
    paymentplan: {
      'read:any': '*',
    },
    rave: {
      'read:any': '*',
    },
    review: {
      'read:any': '*',
    },
    user: {
      'read:any': '*',
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

////////////////////////////////////////////////////////////////
// use this logic to save grants for initial load

// const grants = Object.entries(allGrants).reduce(
//   (acc, [role, resourceData]) => {
//     const main_data = Object.entries(resourceData).reduce(
//       (data, [resource, curr]) => {
//         const inner_data = Object.entries(curr).reduce(
//           (d, [action, attributes]) => {
//             d.push({ role, resource, action, attributes });
//             return d;
//           },
//           [],
//         );
//         return [...data, ...inner_data];
//       },
//       [],
//     );
//     return [...acc, ...main_data];
//   },
//   [],
// );
// grants.forEach((data) => {
//   data.postedById = 1;
// });
// console.log(grants);
// const data = await Grant.save(grants);
