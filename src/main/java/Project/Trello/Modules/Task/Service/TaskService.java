package Project.Trello.Modules.Task.Service;

import Project.Trello.Modules.Task.Repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    public TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
}
