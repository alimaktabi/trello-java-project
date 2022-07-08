package Project.Trello.Modules.Board.Repository;

import Project.Trello.Modules.Board.Models.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
