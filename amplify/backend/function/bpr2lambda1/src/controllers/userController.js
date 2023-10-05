import { userServices } from '../services/userService.js';
import { InternalServerError, ApiError } from '../helpers/apiError.js';

export const registerUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const createdUser = await userServices.registerUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - registerUser'));
    }
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const token = await userServices.loginUser(user);
    res.status(200).json(token);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - loginUser'));
    }
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { body: user, headers: token } = req;
    const updatedUser = await userServices.updateUserById(token, user);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - loginUser'));
    }
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { headers: token } = req;
    await userServices.deleteUserById(token);
    res.status(204).end();
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - deleteUserById'));
    }
  }
};
