package com.exam.product.service;

import com.exam.product.exception.InvalidCredentialException;
import com.exam.product.exception.UserAlreadyExistException;
import com.exam.product.exception.UserNotFoundException;
import com.exam.product.model.User;
import com.exam.product.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) throws UserAlreadyExistException {
        Optional<User> user1 = userRepository.findById(user.getUserEmail());
        if (user1.isPresent()) {
            throw new UserAlreadyExistException();
        } else {
            return userRepository.save(user);
        }
    }

    @Override
    public User getUserByUserEmail(String userEmail) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(userEmail);

        if (user.isEmpty()) {
            throw new UserNotFoundException();
        } else {
            return user.get();
        }
    }

    @Override
    public String  validateUser(User user) throws InvalidCredentialException, UserNotFoundException {
        Optional<User> user1 = userRepository.findById(user.getUserEmail());
        if(user1.isPresent()){
            if(user1.get().getUserPassword().equals(user.getUserPassword())){
                return "Valid user";
            }else{
               throw new InvalidCredentialException();
            }
        }else {
            throw new UserNotFoundException();
        }
    }
}
