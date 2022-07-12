package Project.Trello.Modules.Task.Controllers;

import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Account.Repository.UserRepository;
import Project.Trello.Modules.Task.Models.State;
import Project.Trello.Modules.Task.Models.Task;
import Project.Trello.Modules.Task.Repository.DiscussionRepository;
import Project.Trello.Modules.Task.Service.StateService;
import Project.Trello.Modules.Task.Service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequestMapping("/tasks")
@RestController
public class TaskController {
    TaskService taskService;

    StateService stateService;

    UserRepository userRepository;

    DiscussionRepository discussionRepository;

    public TaskController(TaskService taskService, UserRepository userRepository, StateService stateService, DiscussionRepository discussionRepository) {
        this.taskService = taskService;
        this.stateService = stateService;
        this.discussionRepository = discussionRepository;
        this.userRepository = userRepository;
    }


    @PostMapping("/{id}")
    public Task create(@RequestBody Task task, @PathVariable Long id) {
        Optional<State> state = stateService.stateRepository.findById(id);
        if (state.isEmpty())
            return null;

        task.date = new Date();
        task.state = state.get();


//        if (task.assignedTo != null) {
//            Set<User> users = new HashSet<>();
//
//            for (User user: task.assignedTo) {
//                var newUser = userRepository.findById(user.id);
//                newUser.ifPresent(users::add);
//            }
//
//            task.assignedTo = users;
//        }

        if (task.discussions != null) {
            task.discussions.forEach((item) -> {
                discussionRepository.save(item);
            });
        }

        return taskService.taskRepository.save(task);
    }

    @PostMapping("/{id}/delete")
    public void delete(@RequestBody Task task, @PathVariable Long id) {
        Optional<State> state = stateService.stateRepository.findById(id);
        if (state.isEmpty() || !state.get().tasks.contains(task))
            return;

        taskService.taskRepository.delete(task);

    }
}
