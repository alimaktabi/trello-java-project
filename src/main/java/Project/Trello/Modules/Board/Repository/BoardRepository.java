package Project.Trello.Modules.Board.Repository;

import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Board.Models.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    public List<Board> findBoardsByMainAdminIsOrUsersContains(User user, User user1);
}
