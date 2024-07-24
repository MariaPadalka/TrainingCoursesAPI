import mongoose from 'mongoose';

const loadSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    lessonType: {
        type: String,
        required: true,
        enum: ['practice', 'lecture'],
        message: (props) =>
            `${props.value} is not a valid lesson type. Must be 'practice' or 'lecture'.`,
    },
    hours: { type: Number, min: 1, required: true },
});

loadSchema.index(
    { teacher: 1, group: 1, subject: 1, lessonType: 1 },
    { unique: true }
);

loadSchema.set('toJSON', {
    versionKey: false,
    transform: (_, ret) => {
        delete ret.__v;
        return ret;
    },
});

const Load = mongoose.model('Load', loadSchema);
export default Load;
