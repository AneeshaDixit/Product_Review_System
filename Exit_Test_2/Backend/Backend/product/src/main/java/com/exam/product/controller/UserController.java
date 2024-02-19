package com.exam.product.controller;

import com.exam.product.exception.InvalidCredentialException;
import com.exam.product.exception.UserAlreadyExistException;
import com.exam.product.exception.UserNotFoundException;
import com.exam.product.model.User;
import com.exam.product.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/check")
    public String check() {
        return "Working...!";
    }

    //    To register the new user
    @PostMapping("/registerNewUser")
    public ResponseEntity<User> registerNewUser(@RequestBody User user) throws IOException {
        try {
            return new ResponseEntity<User>(userService.addUser(user), HttpStatus.OK);
        } catch (UserAlreadyExistException e) {

            return new ResponseEntity("User Already Exists", HttpStatus.CONFLICT);
        }
    }

    //     To get the user details by user email
    @GetMapping("/getUserByUserEmail/{userEmail}")
    public ResponseEntity getUserByUserEmail(@PathVariable String userEmail) throws IOException {
        try {
            return new ResponseEntity<User>(userService.getUserByUserEmail(userEmail), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity("User Not Found", HttpStatus.ACCEPTED);
        }
    }

    //     To validate the user
    @PostMapping("/validateUser")
    public ResponseEntity validateUser(@RequestBody User user) throws IOException {
        try {
            return new ResponseEntity(userService.validateUser(user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity("User Not Found", HttpStatus.ACCEPTED);
        } catch (InvalidCredentialException e) {
            return new ResponseEntity("Wrong Password", HttpStatus.ACCEPTED);
        }
    }


}
