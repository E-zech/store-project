export const RoleTypes = {
    none: 1, //can see products .
    user: 2, //all of the above + add to faves +(will recive mails about marketing)
    business: 3, //(users who already make few purcheses/ the admin decide to make them business) : all of the above + spiceal prices (fast deliveries)
    admin: 4, //can do all + CRUD + CRM (can view all users , change thier status, delete) . // owner of the site
    master: 5, //can do all + can edit users detailes. // me
};

export const pages = [
    { route: '/about', title: 'about' },
    { route: '/login', title: 'login', permissions: [RoleTypes.none] },
    { route: '/signup', title: 'signup', permissions: [RoleTypes.none] },
    { route: '/faves', title: 'favorites ', permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin, RoleTypes.master] },
    { route: '/product-management', title: 'PRM', permissions: [RoleTypes.admin, RoleTypes.master] },
    { route: '/user-management', title: 'CRM', permissions: [RoleTypes.admin, RoleTypes.master] }];

export const disable = [
    '/user-management', '/about', '/login', '/signup', '/account', '/checkout', '/my-orders'
];

