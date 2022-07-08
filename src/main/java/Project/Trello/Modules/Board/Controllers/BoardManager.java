package Project.Trello.Modules.Board.Controllers;


import Project.Trello.Modules.Board.Models.Board;
import Project.Trello.Modules.Board.Services.BoardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/boards")
@RestController
public class BoardManager {

    BoardService boardService;


    public BoardManager(BoardService boardService) {
        this.boardService = boardService;
    }


    @GetMapping("/")
    public List<Board> boards() {
        return boardService.boards();
    }
}
