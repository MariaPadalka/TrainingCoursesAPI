import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    specialty: { type: String, required: true },
    department: { type: String, required: true },
    studentCount: { type: Number, min: 1, required: true },
});

groupSchema.index({ specialty: 1, department: 1 }, { unique: true });

groupSchema.set('toJSON', {
    versionKey: false,
    transform: (_, ret) => {
        delete ret.__v;
        return ret;
    },
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
