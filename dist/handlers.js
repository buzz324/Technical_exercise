"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const usersData_1 = require("./usersData");
const getUsers = (req, res) => {
    const surname = req.query.surname;
    if (typeof surname !== 'string') {
        return res.status(404).json({ error: 'Bad request' });
    }
    const matchingUsers = usersData_1.users.filter(user => user.surname.toLowerCase() === surname.toLowerCase());
    if (matchingUsers.length === 0) {
        return res.status(400).json({ error: 'No matching users found' });
    }
    res.status(200).json(matchingUsers);
};
exports.getUsers = getUsers;
