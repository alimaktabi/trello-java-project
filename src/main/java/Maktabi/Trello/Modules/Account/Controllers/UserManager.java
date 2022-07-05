package Maktabi.Trello.Modules.Account.Controllers;


import Maktabi.Trello.Modules.Account.Models.User;
import Maktabi.Trello.Modules.Account.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RequestMapping("/accounts")
@RestController
public class UserManager {

    UserService userService;

    public UserManager(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register/")
    public User register(@Valid @RequestBody() User user, HttpServletResponse response) throws Exception {
        User registered = userService.create(user);

        response.addCookie(new Cookie("token", registered.token));

        return registered;
    }

    @GetMapping("/")
    public List<User> users() {
        return userService.users();
    }

}
