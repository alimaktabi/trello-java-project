package Project.Trello.Modules.Account.Services;


import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Account.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService  {
    public UserRepository userRepository;

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

    public User findByCredentials(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (!user.password.equals(password))
            return null;

        return user;
    }

    public List<User> users() {
        return userRepository.findAll();
    }

    public User findByToken(String token) {
        return  userRepository.findByToken(token);
    }
}
