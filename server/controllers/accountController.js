const prisma = require('../prisma/prisma');

class AccountController {
    getAllUsers = async (req, res, next) => {
        try {
            const getAllUserAccount = await prisma.user.findMany();
            res.status(200).json(getAllUserAccount);
        } catch (error) {
            return next(error);
        };
    };

    addUserRole = async (req, res, next) => {
        try {
            const addRole = await prisma.user.update({
                where: { 
                    id: req.body.userId,
                },
                data: {
                    role: req.body.role
                },
            });
            return res.status(200).json(addRole);
        } catch (error) {
            return next(error)
        }
    };
}

module.exports = new AccountController();