const z = require("zod");

const signupUser = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8),
});

const loginUser = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

module.exports = {
    signupUser,
    loginUser
};