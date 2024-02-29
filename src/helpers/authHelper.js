const Joi = require('joi');
const { getRepository } = require("typeorm");
const User = require("../models/User"); // Make sure to adjust this path to your User entity schema
const { getUser } = require('../services/authService');
const {
  createIntern,
  createEncadrant
} = require('../services/authService');

// Enumerations
const Gender = Object.freeze({
  Male: 'male',
  Female: 'female',
});

const Role = Object.freeze({
  Admin: 'admin',
  Intern: 'intern',
  Encadrant: 'encadrant',
});

let validateUser = (user) => {
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(55).required().messages({
        "any.required": "First Name is required",
        "string.empty": "First Name is not allowed to be empty",
        "string.min": "First Name length must be at least 3 characters long",
        "string.max": "First Name length must be less than or equal to 55 characters long"
      }),
      lastName: Joi.string().min(3).max(55).required().messages({
        "any.required": "Last Name is required",
        "string.empty": "Last Name is not allowed to be empty",
        "string.min": "Last Name length must be at least 3 characters long",
        "string.max": "Last Name length must be less than or equal to 55 characters long"
      }),
      address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address is not allowed to be empty",
      }),
      email: Joi.string().email({ tlds: { allow: false } }).min(5).max(255).required().messages({
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
        "string.min": "Email length must be at least 5 characters long",
        "string.max": "Email length must be less than or equal to 255 characters long",
        "string.email": "Email must be a valid email"
      }),
      gender: Joi.string().valid(...Object.values(Gender)).messages({
        "any.only": `Gender must be one of the following: ${Object.values(Gender).join(', ')}`
      }),
      password: Joi.string().min(8).max(255).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is not allowed to be empty",
        "string.min": "Password length must be at least 8 characters long",
        "string.max": "Password length must be less than or equal to 255 characters long",
      }),
      role: Joi.string().valid(...Object.values(Role)).messages({
        "any.only": `Role must be one of the following: ${Object.values(Role).join(', ')}`
      }),
    });
  
    return schema.validate(user);
  }
  


  const initializeUser = ({
    firstName,
    lastName,
    address,
    email,
    gender,
    role,
    password,
}) => {
    // Simply create a new instance without saving it
    const userRepository = getRepository(User);
    let user = userRepository.create({
        firstName,
        lastName,
        address,
        email,
        gender,
        role,
        password,
    });

    // Return the new user instance without saving it to the database
    return user;
};

//function to extract user data from the request body
let extractUserDataFromRequest = (req) => {
    return {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role,
        password: req.body.password,
    }
}

let verifyEmailAddresUniqueness = async (email) => {
    try {
        let user = await getUser(email);
        if (user) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw new Error(error);
    }

}

let assignModelBasedOnRole = async (role, userId) => {

    if (role === Role.Intern) {
        return await createIntern({
          user: userId
        });
    }
    else if (role === Role.Encadrant) {
        return await createEncadrant({
          user: userId
        });
    }
    else {

        return null;
    }
}
  
module.exports = {
    validateUser,
    initializeUser,
    extractUserDataFromRequest,
    verifyEmailAddresUniqueness,
    assignModelBasedOnRole
}