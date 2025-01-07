// import { defineEventHandler } from 'h3';
// import { useMongoose } from '#nuxt-mongoose';

// export default defineEventHandler(async (event) => {
//   const mongoose = useMongoose();
//   const collectionName = event.context.query.collection || 'demos'; // Default to 'demos' if no collection is specified

//   try {
//     const data = await mongoose.connection.db.collection(collectionName).find({}).toArray();
//     return data;
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
//   }
// });
