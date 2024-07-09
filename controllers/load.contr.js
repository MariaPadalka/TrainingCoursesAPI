import Load from "../models/load.mdl.js";

// Отримати всі навантаження
export const getAllLoads = async (req, res) => {
  try {
    const loads = await Load.find()
      .populate("teacherID")
      .populate("groupID")
      .populate("subjectID");
    res.json(loads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Створити навантаження
export const createLoad = async (req, res) => {
  const { teacherID, groupID, subjectID, lessonType, hours } = req.body;

  try {
    const load = new Load({ teacherID, groupID, subjectID, lessonType, hours });
    const newLoad = await load.save();
    res.status(201).json(newLoad);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
