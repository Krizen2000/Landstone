import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact_no: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  saved_properties: { type: [String], required: false },
  interested_properties: { type: [String], required: false },
});

const Client = mongoose.model("Client", ClientSchema);
export default Client;
