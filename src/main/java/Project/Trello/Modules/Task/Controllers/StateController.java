package Project.Trello.Modules.Task.Controllers;

import Project.Trello.Modules.Board.Services.BoardService;
import Project.Trello.Modules.Task.Models.State;
import Project.Trello.Modules.Task.Service.StateService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/states")
@RestController
public class StateController {
    StateService stateService;

    BoardService boardService;

    public StateController(StateService stateService, BoardService boardService) {
        this.stateService = stateService;
        this.boardService = boardService;
    }

    @PostMapping("/{id}")
    public State createState(@Valid() @RequestBody() State state, @PathVariable Long id) {
        var board = boardService.boardRepository.findById(id);

        if (board.isEmpty())
            return null;

        state.board = board.get();

        return stateService.stateRepository.save(state);
    }

}
