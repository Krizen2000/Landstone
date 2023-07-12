import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact_no: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Agent = mongoose.model("Agent", AgentSchema);
export default Agent;
