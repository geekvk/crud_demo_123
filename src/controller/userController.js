// standarized respomse 

import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "../models/userModel.js";

const handleResponse = (res, statusCode, success, message, data = null) => {
    res.status(statusCode).json({
        status: statusCode,
        success,
        message,
        data
    });
};

export const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const result = await createUserService(name, email);
        handleResponse(res, 201, true, "User created successfully", result);
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const result = await getAllUsersService();
        handleResponse(res, 200, true, "Users retrieved successfully", result);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getUserByIdService(id);
        if (!result) {
            return handleResponse(res, 404, false, "User not found");
        }
        handleResponse(res, 200, true, "User retrieved successfully", result);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await updateUserService(id, name, email);
        handleResponse(res, 200, true, "User updated successfully", result);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await deleteUserService(id);
        handleResponse(res, 200, true, "User deleted successfully");
    } catch (err) {
        next(err);
    }
};



export default handleResponse;