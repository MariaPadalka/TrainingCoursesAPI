import mongoose from 'mongoose';

export const getMillisecondsFromExpiration = (expiration) => {
    const match = expiration.match(/(\d+)([dh])/);
    if (!match) return null;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        default:
            return null;
    }
};

export const convertToObjectId = (value) => {
    if (value instanceof mongoose.Types.ObjectId) return value;
    return new mongoose.Types.ObjectId(`${value}`);
};

const validKeys = ['user', 'teacher', 'group', 'subject'];

export const convertedFilters = (filters) => {
    const converted = {};

    for (const [key, value] of Object.entries(filters)) {
        if (validKeys.includes(key) && value) {
            converted[key] = convertToObjectId(value);
        } else {
            converted[key] = value;
        }
    }

    return converted;
};
