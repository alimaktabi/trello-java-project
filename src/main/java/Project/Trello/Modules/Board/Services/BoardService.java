package Project.Trello.Modules.Board.Services;

import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Board.Models.Board;
import Project.Trello.Modules.Board.Repository.BoardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {


    public BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> boards() {
        return boardRepository.findAll();
    }


    public Board add(Board board) {
        boardRepository.save(board);

        return board;
    }

    public List<Board> getAllUserBoards(User user) {
        return boardRepository.findBoardsByMainAdminIsOrUsersContains(user, user);
    }
}
