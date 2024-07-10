import mongoose from 'mongoose';

const loadSchema = new mongoose.Schema({
  teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  subjectID: {
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

const Load = mongoose.model('Load', loadSchema);
export default Load;
