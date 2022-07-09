package Project.Trello.Modules.Task.Service;

import Project.Trello.Modules.Task.Repository.StateRepository;
import org.springframework.stereotype.Service;

@Service
public class StateService {
    public StateRepository stateRepository;

    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }


}
