import { userServices } from '../services/userService';
import { InternalServerError, BadRequestError, ApiError } from '../helpers/apiError.js';

export const registerUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const createdUser = await userServices.registerUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof ApiError) next(error);
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
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - loginUser'));
    }
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    // body from req.body and userId is stored in the headers
    const { body: user } = req;
    const { userId } = req.headers;
    const updatedUser = await userServices.updateUserById(userId, user);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - loginUser'));
    }
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.headers;
    await userServices.deleteUserById(userId);
    res.status(204).json({
      message: `User with id ${userId} deleted`,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/userController.js - deleteUserById'));
    }
  }
};
