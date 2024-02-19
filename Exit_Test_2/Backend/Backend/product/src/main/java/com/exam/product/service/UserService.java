package com.exam.product.service;

import com.exam.product.exception.InvalidCredentialException;
import com.exam.product.exception.UserAlreadyExistException;
import com.exam.product.exception.UserNotFoundException;
import com.exam.product.model.User;

public interface UserService {
    User addUser(User user) throws UserAlreadyExistException;

    User getUserByUserEmail(String userEmail) throws UserNotFoundException;

    String validateUser(User user) throws InvalidCredentialException, UserNotFoundException;
}
