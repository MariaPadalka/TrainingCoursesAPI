import Subject from '../models/subject.mdl.js';

// Отримати всі предмети
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити предмет
export const createSubject = async (req, res) => {
  const { subjectName, hourlyRate } = req.body;

  try {
    const subject = new Subject({ subjectName, hourlyRate });
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
