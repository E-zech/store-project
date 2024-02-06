import User, { RoleTypes } from '../../models/User.js';
import { adminGuard, guard } from '../../middleware/guard.js';

const changeIsBusiness = app => {
    app.patch('/users/:id', guard, adminGuard, async (req, res) => {
        const paramsId = req.params.id;

        if (!paramsId) {
            return res.status(400).send('Please provide user ID');
        }

        try {
            const user = await User.findById(paramsId).select('-password');

            if (!user) {
                return res.status(404).send('User not found / changeIsBusiness.js');
            }

            user.roleType = user.roleType === RoleTypes.user ? RoleTypes.business : RoleTypes.user;

            await user.save();
            res.send(user);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default changeIsBusiness;



