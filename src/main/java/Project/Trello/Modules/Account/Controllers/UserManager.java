package Project.Trello.Modules.Account.Controllers;


import Project.Trello.App.FileUploadUtil;
import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Account.Services.UserService;
import Project.Trello.Modules.Board.Services.BoardService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.ValidationException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;


@RequestMapping("/accounts")
@RestController
public class UserManager {

    public static class LoginRequest {
        public String email;

        public String password;
    }

    UserService userService;
    BoardService boardService;

    public UserManager(UserService userService, BoardService boardService) {
        this.userService = userService;
        this.boardService = boardService;
    }

    @PostMapping("register/")
    public User register(@Valid @RequestBody() User user, HttpServletResponse response) throws Exception {
        User registered = userService.create(user);

        var cookie = new Cookie("token", user.token);

        cookie.setPath("/");

        response.addCookie(cookie);

        return registered;
    }

    @PostMapping("login/")
    public User login(@Valid() @RequestBody() LoginRequest body, HttpServletResponse response) {
        if (!userService.exists(body.email))
        {
            throw new ValidationException("Account not found");
        }

        User user = userService.findByCredentials(body.email, body.password);

        if (user == null)
            throw new ValidationException("Your credentials didn't match our record");

        user.token = UUID.randomUUID().toString();

        userService.userRepository.save(user);

        var cookie = new Cookie("token", user.token);

        cookie.setPath("/");

        response.addCookie(cookie);

        return user;
    }

    @PostMapping("/logout")
    public boolean logout(@CookieValue() String token, HttpServletResponse response) {
        var user = userService.findByToken(token);

        var cookie = new Cookie("token", null);

        cookie.setPath("/");

        response.addCookie(cookie);

        if (user == null)
            return false;

        user.token = null;

        userService.userRepository.save(user);

        return true;
    }

    @GetMapping("/")
    public List<User> users() {
        return userService.users();
    }

    @GetMapping("/board/{id}")
    public Set<User> usersFromBoard(@PathVariable Long id) {
        var query = boardService.boardRepository.findById(id);

        if (query.isEmpty())
            return null;

        var board = query.get();

        board.users.add(board.mainAdmin);

        return board.users;
    }


    @PostMapping("/update")
    public User update(User user, @RequestParam("photo") MultipartFile multipartFile) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        user.image ="/" + fileName;

        User savedUser = userService.userRepository.save(user);

        String uploadDir = "src/main/resources/static/";

        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);

        return savedUser;
    }


    @GetMapping("/me")
    public User getUser(@CookieValue("token") String token) {
        return userService.findByToken(token);
    }

}
