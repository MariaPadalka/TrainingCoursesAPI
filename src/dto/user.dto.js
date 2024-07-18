export const userToDto = (user) => {
    return {
        id: user._id,
        email: user.email,
        role: user.role,
    };
};
