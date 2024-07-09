import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  specialty: { type: String, required: true },
  department: { type: String, required: true },
  studentCount: { type: Number, min: 1, required: true },
});

groupSchema.index({ specialty: 1, department: 1 }, { unique: true });

const Group = mongoose.model("Group", groupSchema);
export default Group;
