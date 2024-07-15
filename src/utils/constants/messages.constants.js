export const ERROR_MESSAGES = {
    INVALID_OBJECT_ID: 'Invalid ObjectId',
    MISSING_FIELDS: 'Not all required fields are present.',
    REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    AUTH_TOKEN_MISSING: 'Authentication token is missing',
    AUTH_TOKEN_INVALID: 'Authentication token is invalid',
    UNAUTHORIZED_ACCESS: 'You do not have permission to perform this action',
    WEAK_PASSWORD: 'Password does not meet complexity requirements',
    TOKEN_MISSING: 'Token is missing',
    TOKEN_INVALID: 'Token is invalid or expired',
    FORBIDDEN: 'You do not have the necessary permissions',

    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid email or password',
    TEACHER_NOT_FOUND: 'Teacher not found',

    GROUP_NOT_FOUND: 'Group not found',

    SUBJECT_NOT_FOUND: 'Subject not found',
    SUBJECT_IDS_INVALID:
        'One or more subject IDs are invalid or there are duplicates',
    SUBJECT_NOT_FOUND_IN_TEACHER:
        'This subject is not taught by specified teacher.',

    LOAD_NOT_FOUND: 'Load not found',
};

export const SUCCESS_MESSAGES = {
    SUCCESS: 'Success',
    LOGGED_OUT: 'Logged out successfully',
    PASSWORD_CHANGED: 'Password changed successfully',
    USER_REGISTERED: 'User successfully registered',
    USER_DELETED: 'User deleted successfully',
    TEACHER_DELETED: 'Teacher deleted successfully',
    GROUP_DELETED: 'Group deleted successfully',
    SUBJECT_DELETED: 'Subject deleted successfully',
    LOAD_DELETED: 'Load deleted successfully',
};
