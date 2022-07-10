package Project.Trello.Modules.Task.Repository;

import Project.Trello.Modules.Task.Models.Task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
