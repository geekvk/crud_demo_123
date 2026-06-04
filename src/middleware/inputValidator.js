import Joi from "joi";

// Validation schema for user input
const userSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required()
});

// Middleware to validate user input
export const validateUserInput = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
}