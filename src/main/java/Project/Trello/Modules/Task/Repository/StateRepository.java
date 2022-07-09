package Project.Trello.Modules.Task.Repository;

import Project.Trello.Modules.Task.Models.State;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<State, Long> {

}
