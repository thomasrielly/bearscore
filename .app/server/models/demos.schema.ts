import { Schema, model } from 'mongoose';

const DemoSchema = new Schema({
  company: { type: String, required: true },
  logo: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  category: { type: String, required: true },
  costRange: { type: String, required: true },
  averageCost: { type: Number, required: true },
  team: [{
    tooltip: { type: String, required: true },
    src: { type: String, required: true }
  }],
  location: { type: String, required: true },
  video: { type: String, required: true },
  likes: { type: Number, required: true },
  reviews: [{
    username: { type: String, required: true },
    position: { type: String, required: true },
    src: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    status: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true }
  }],
  overview: { type: String, required: true },
  website: { type: String, required: true },
  industry: { type: String, required: true },
  companySize: { type: String, required: true },
  headquarters: { type: String, required: true },
  subCategory: { type: String, required: true }
});

const DemoModel = model('Demo', DemoSchema);
export default DemoModel;
