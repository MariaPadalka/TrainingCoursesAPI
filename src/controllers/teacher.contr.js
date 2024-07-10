import Teacher from '../models/teacher.mdl.js';
import Subject from '../models/subject.mdl.js';

const subjectsValid = async (subjects) => {
  if (subjects && subjects.length > 0) {
    const validSubjects = await Subject.find({ _id: { $in: subjects } });
    return validSubjects.length === subjects.length;
  }
  return true;
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('subjects');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTeacher = async (req, res) => {
  const { firstName, lastName, patronymic, phone, experience, subjects } =
    req.body;

  try {
    const isValid = await subjectsValid(subjects);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: 'One or more subject IDs are invalid.' });
    }

    const teacher = new Teacher({
      firstName,
      lastName,
      patronymic,
      phone,
      experience,
      subjects,
    });
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { firstName, lastName, patronymic, phone, experience, subjects } =
    req.body;

  try {
    const isValid = await subjectsValid(subjects);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: 'One or more subject IDs are invalid.' });
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, patronymic, phone, experience, subjects },
      { runValidators: true, new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
