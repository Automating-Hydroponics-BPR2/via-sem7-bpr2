import { userServices } from '../services/userService.js';
import { InternalServerError, ApiError } from '../helpers/apiError.js';

export const registerUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const token = await userServices.registerUser(user);
    res.status(201).json(token);
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
    const {
      body: user,
      user: { id },
    } = req;
    const updatedUser = await userServices.updateUserById(user, id);
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
    const {
      user: { id },
    } = req;
    await userServices.deleteUserById(id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - deleteUserById'));
    }
  }
};
