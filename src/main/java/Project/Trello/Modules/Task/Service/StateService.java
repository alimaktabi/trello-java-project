package Project.Trello.Modules.Task.Service;

import Project.Trello.Modules.Task.Models.State;
import Project.Trello.Modules.Task.Models.Task;
import Project.Trello.Modules.Task.Repository.StateRepository;
import Project.Trello.Modules.Task.Repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class StateService {
    public StateRepository stateRepository;

    public TaskRepository taskRepository;

    public StateService(StateRepository stateRepository, TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
        this.stateRepository = stateRepository;
    }


    public State saveWithTasks(State state) {
        if (state.tasks == null) return stateRepository.save(state);

        for (Task task: state.tasks) {
            task.state = state;
            taskRepository.save(task);
        }

        return stateRepository.save(state);
    }


}
