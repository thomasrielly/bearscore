import { defineEventHandler, createError, H3Event } from 'h3';
import DemoModel from '../../models/demos.schema';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const data = await DemoModel.find({}).lean().exec();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
