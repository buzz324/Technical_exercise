"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const usersData_1 = require("./usersData");
const types_1 = require("./types");
const class_validator_1 = require("class-validator");
const errorMessages_1 = require("./errorMessages");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let getUserQuery = new types_1.GetUsersQuery();
    const surname = req.query.surname;
    getUserQuery.surname = surname;
    try {
        yield (0, class_validator_1.validateOrReject)(getUserQuery);
    }
    catch (errors) {
        return res.status(400).json(errorMessages_1.errorMessages.invalidSurname);
    }
    const matchingUsers = usersData_1.users.filter(user => user.surname.toLowerCase() === surname.toLowerCase());
    if (!matchingUsers.length) {
        return res.status(404).json(errorMessages_1.errorMessages.noMatchingUsers);
    }
    return res.status(200).json(matchingUsers);
});
exports.getUsers = getUsers;
