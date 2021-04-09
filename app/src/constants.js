//export const API_EP = 'http://192.168.99.100/api';
export const API_EP = '/api';
export const ADMIN_ROLE = 'time_admin';
export const USER_ROLE = 'time_user';
export const roleToText = (role) => (
    role===USER_ROLE?'User':'Admin'
);
export const ROLES = [
    { id: USER_ROLE, name: roleToText(USER_ROLE) },
    { id: ADMIN_ROLE, name: roleToText(ADMIN_ROLE) },
];
