import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    patronymic: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\+\d{2} \d{3} \d{3} \d{4}$/.test(v);
            },
            message: (props) =>
                `${props.value} is not a proper format. Use this example: +xx xxx xxx xxxx`,
        },
    },
    experience: { type: Number, min: 0, required: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

teacherSchema.set('toJSON', {
    versionKey: false,
    transform: (_, ret) => {
        delete ret.__v;
        return ret;
    },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
