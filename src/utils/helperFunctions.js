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
