import Group from '../models/group.mdl.js';
import asyncErrorHandler from '../utils/errors/asyncError.handler.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/errors/messages.js';

export const getAllGroups = asyncErrorHandler(async (req, res) => {
    const groups = await Group.find();
    res.json(groups);
});

export const createGroup = asyncErrorHandler(async (req, res) => {
    const { specialty, department, studentCount } = req.body;

    const group = new Group({ specialty, department, studentCount });
    const newGroup = await group.save();
    res.status(201).json(newGroup);
});

export const getGroupById = asyncErrorHandler(async (req, res, next) => {
    const group = await Group.findById(req.params.id);
    if (!group)
        return next(new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404));
    res.json(group);
});

export const putGroup = asyncErrorHandler(async (req, res, next) => {
    const { specialty, department, studentCount } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
        req.params.id,
        { specialty, department, studentCount },
        { runValidators: true, new: true }
    );
    if (!updatedGroup)
        return next(new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404));

    res.json(updatedGroup);
});

export const patchGroup = asyncErrorHandler(async (req, res, next) => {
    const updateObject = req.body;
    const id = req.params.id;

    const updatedGroup = await Group.findByIdAndUpdate(
        id,
        { $set: updateObject },
        { new: true }
    );

    if (!updatedGroup)
        return next(new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404));

    res.json(updatedGroup);
});

export const deleteGroup = asyncErrorHandler(async (req, res, next) => {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group)
        return next(new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404));

    res.json({ message: SUCCESS_MESSAGES.GROUP_DELETED });
});
