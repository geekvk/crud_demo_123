import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controller/userController.js";

import {validateUserInput} from "../middleware/inputValidator.js";

dotenv.config();

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get a user by ID
router.get("/:id", getUserById);

// Create a new user    
router.post("/", validateUserInput, createUser);

// Update a user by ID
router.put("/:id", validateUserInput, updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

export default router;