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
    return mongoose.Types.ObjectId.createFromHexString(value);
};

const validKeys = ['user', 'teacher', 'group', 'subject'];

export const convertedFilters = (filters) => {
    Object.keys(filters).reduce((acc, key) => {
        if (validKeys.includes(key) && filters[key]) {
            acc[key] = convertToObjectId(filters[key]);
        } else {
            acc[key] = filters[key]; // Залишаємо значення без змін, якщо ключ не в списку validKeys
        }
    }, {});
};
