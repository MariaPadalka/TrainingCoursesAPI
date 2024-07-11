import mongoose from 'mongoose';
import { ERROR_MESSAGES } from '../utils/errors/messages';

const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res
            .status(400)
            .json({ message: ERROR_MESSAGES.INVALID_OBJECT_ID });
    }

    next();
};

export default validateObjectId;
