import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  agentId: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "property",
      "resort",
      "home",
      "apartment",
      "warehouse",
      "storehouse",
    ],
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: {
    from: { type: Number, required: true },
    to: { type: Number, required: true },
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  visibility: { type: Boolean, required: true, default: true },
  interested: { type: [String], required: true, default: [] },
  views: { type: [String], required: true, default: [] },
});

const Property = mongoose.model("Property", PropertySchema);
export default Property;
