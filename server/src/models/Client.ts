import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const ClientSchema = mongoose.model("Client", clientSchema);
export default ClientSchema;
