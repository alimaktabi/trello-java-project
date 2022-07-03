package Maktabi.Trello.Modules.Account.Services;


import Maktabi.Trello.Modules.Account.Models.User;
import Maktabi.Trello.Modules.Account.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User create(User user) throws Exception {
        if (userRepository.findByEmail(user.email) != null)
        {
            throw new Exception("User with this email already exists");
        }

        user.token = UUID.randomUUID().toString();

        return userRepository.save(user);
    }

    public boolean exists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public List<User> users() {
        return userRepository.findAll();
    }
}
