package Project.Trello.Modules.Task.Repository;

import Project.Trello.Modules.Task.Models.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
}
