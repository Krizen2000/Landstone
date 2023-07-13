import mongoose from "mongoose";

const NewsEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const NewEmail = mongoose.model("NewsEmail", NewsEmailSchema);
export default NewEmail;
