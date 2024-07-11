import mongoose from 'mongoose';

const hourlyRateSchema = new mongoose.Schema(
    {
        lecture: { type: Number, required: true },
        practice: { type: Number, required: true },
    },
    { _id: false }
);

const subjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true, unique: true },
    hourlyRate: { type: hourlyRateSchema, required: true },
});

subjectSchema.set('toJSON', {
    versionKey: false,
    transform: (_, ret) => {
        delete ret.__v;
        return ret;
    },
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
