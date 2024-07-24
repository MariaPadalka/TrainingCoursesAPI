import Group from '../models/group.mdl.js';
import Load from '../models/load.mdl.js';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/constants/messages.constants.js';
import CustomError from '../utils/customError.class.js';

class GroupService {
    getAllGroups = async () => {
        return await Group.find();
    };

    createGroup = async (objectToCreate) => {
        const { specialty, department, studentCount } = objectToCreate;
        const group = new Group({ specialty, department, studentCount });
        return await group.save();
    };

    getGroupById = async (id) => {
        const group = await Group.findById(id);
        if (!group) throw new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404);
        return group;
    };

    putGroup = async (id, objectToUpdate) => {
        const { specialty, department, studentCount } = objectToUpdate;
        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            { specialty, department, studentCount },
            { runValidators: true, new: true }
        );
        if (!updatedGroup)
            throw new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404);

        return updatedGroup;
    };

    patchGroup = async (id, updateObject) => {
        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { new: true }
        );

        if (!updatedGroup)
            throw new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404);

        return updatedGroup;
    };

    deleteGroup = async (id) => {
        const group = await Group.findByIdAndDelete(id);
        if (!group) throw new CustomError(ERROR_MESSAGES.GROUP_NOT_FOUND, 404);

        await Load.deleteMany({ group: group._id });

        return { message: SUCCESS_MESSAGES.GROUP_DELETED };
    };
}

export default new GroupService();
