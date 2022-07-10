package Project.Trello.Modules.Board.Controllers;


import Project.Trello.Modules.Account.Helpers.Authentication;
import Project.Trello.Modules.Board.Models.Board;
import Project.Trello.Modules.Board.Services.BoardService;
import Project.Trello.Modules.Task.Models.State;
import Project.Trello.Modules.Task.Service.StateService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequestMapping("/boards")
@RestController
public class BoardManager {

    BoardService boardService;

    Authentication authentication;

    StateService stateService;


    public BoardManager(BoardService boardService, Authentication authentication, StateService stateService) {
        this.boardService = boardService;

        this.stateService = stateService;

        this.authentication = authentication;
    }

    @PostMapping("/{id}/delete")
    public boolean deleteBoard(@PathVariable Long id) {
        boardService.boardRepository.deleteAllById(Collections.singleton(id));

        return true;
    }


    @GetMapping("/")
    public List<Board> boards(@CookieValue() String token) {
        var user = authentication.getUserFromToken(token);

        return boardService.getAllUserBoards(user);
    }

    @GetMapping("/{id}")
    public Board board(@PathVariable Long id) {
        var board = boardService.boardRepository.findById(id);

        return board.isEmpty() ? null: board.get();
    }

    @PostMapping("/update")
    public Board update(@Valid() @RequestBody() Board board) {

        if (board.states != null) {
            for (State state : board.states) {
                state.board = board;
                stateService.saveWithTasks(state);
            }
        }

        return boardService.boardRepository.save(board);
    }

    @PostMapping("/create")
    public Board create(@Valid @RequestBody() Board board, @CookieValue() String token) {

        board.mainAdmin = authentication.getUserFromToken(token);

        board.date = new Date();

        return boardService.add(board);
    }
}
