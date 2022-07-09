package Project.Trello.Modules.Account.Helpers;

import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Account.Services.UserService;
import org.springframework.stereotype.Service;

@Service
public class Authentication {
    private UserService userService;

    public Authentication(UserService userService)
    {
        this.userService = userService;
    }

    public User getUserFromToken(String token) {
        return userService.findByToken(token);
    }
}
