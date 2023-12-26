/**
 * Express router paths go here.
 */


export default {
  Base: '/api/v1',
  Users: {
    Base: '/users',
    Get: '/all',
    GetOne: '/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Auth:{
    Base: '/auth',
    Login: '/login',
    Logout: '/logout'
  },
  Roles: {
    Base: '/roles',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Permissions: {
    Base: '/permissions',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
