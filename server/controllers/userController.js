const prisma = require('../prisma/prisma');

class UserController {
    isUserExist = async (req, res, next) => {
        try {
            const checkUserExist = await prisma.user.findUnique({
                where: {
                    id: req.query.currentUserId,
                },
            });
            if (checkUserExist) {
                return res.status(200).json({ message: "User is exist!!" })
            } else {
                return res.status(200).json({ message: "User is not exist!!" })
            }
        } catch (error) {
            return next(error)
        }
    };

    addNewUser = async (req, res, next) => {
        try {
            const addUser = await prisma.user.create({
                data: {
                    username: req.body.username,
                    gender: req.body.gender,
                    age: parseInt(req.body.age),
                    email: req.body.email,
                    phonenumber: req.body.phonenumber,
                    role: "user",
                    id: req.body.currentUserId,
                },
            });
            return res.status(200).json(addUser)
        } catch (error) {
            return next(error)
        }
    };

    getUserData = async (req, res, next) => {
        try {
            const getUser = await prisma.user.findUnique({
                where: {
                    id: req.query.currentUserId,
                }
            });
            res.status(200).json(getUser);
        } catch (error) {
            return next(error);
        }
    };
}

module.exports = new UserController();