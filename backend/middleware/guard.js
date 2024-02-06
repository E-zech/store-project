import jwt from 'jsonwebtoken';
import { getUserFromTKN } from '../configs/config.js';
import { RoleTypes } from '../models/User.js';

export const guard = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send('Authentication failed. Please provide a valid token');
            } else {
                next();
            }
        });
    } catch (error) {
        console.error('Error in guard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const businessGuard = (req, res, next) => { // if the user from the token is business/admin/master then he can pass the guard.
    try {
        const { roleType } = getUserFromTKN(req, res);

        if (roleType === RoleTypes.business || roleType === RoleTypes.admin || roleType === RoleTypes.master) {
            next();
        } else {
            return res.status(401).send('User not authorized / guard.js > businessGuard');
        }
    } catch (error) {
        console.error('Error in businessGuard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const adminGuard = (req, res, next) => {// if the user from the token is admin/master then he can pass the guard.
    try {
        const { roleType } = getUserFromTKN(req, res);

        if (roleType === RoleTypes.admin || roleType === RoleTypes.master) {
            next();
        } else {
            return res.status(401).send('User not authorized , Admins only / guard.js > adminGuard');
        }
    } catch (error) {
        console.error('Error in adminGuard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const masterGuard = (req, res, next) => {// if the user from the token is master then he can pass the guard.
    try {
        const { roleType } = getUserFromTKN(req, res);

        if (roleType === RoleTypes.master) {
            next();
        } else {
            return res.status(401).send('User not authorized , Master only / guard.js > masterGuard');
        }
    } catch (error) {
        console.error('Error in masterGuard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};
