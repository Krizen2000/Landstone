import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  agentId: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  price: {
    form: { type: Number, required: true },
    to: { type: Number, required: true },
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  visibility: { type: Boolean, required: true, default: true },
  interested: { type: [String], required: false },
  views: { type: Number, required: true, default: 0 },
});

const Property = mongoose.model("Property", PropertySchema);
export default Property;
