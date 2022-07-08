package Project.Trello.Modules.Board.Services;

import Project.Trello.Modules.Board.Models.Board;
import Project.Trello.Modules.Board.Repository.BoardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {


    private BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> boards() {
        return boardRepository.findAll();
    }
}
