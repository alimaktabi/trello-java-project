package Project.Trello.Modules.Account.Controllers;


import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Account.Services.UserService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;


@RequestMapping("/accounts")
@RestController
public class UserManager {

    public static class LoginRequest {
        public String email;

        public String password;
    }

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

    @PostMapping("login/")
    public User login(@RequestBody() LoginRequest body, HttpServletResponse response) {
        User user = userService.findByCredentials(body.email, body.password);

        if (user == null)
            return null;

        user.token = UUID.randomUUID().toString();

        userService.userRepository.save(user);

        var cookie = new Cookie("token", user.token);

        cookie.setPath("/");

        response.addCookie(cookie);

        return user;
    }

    @GetMapping("/")
    public List<User> users() {
        return userService.users();
    }


    @GetMapping("/me")
    public User getUser(@CookieValue("token") String token) {
        return userService.findByToken(token);
    }

}
