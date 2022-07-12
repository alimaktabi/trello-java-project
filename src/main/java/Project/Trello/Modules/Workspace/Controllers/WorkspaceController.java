package Project.Trello.Modules.Workspace.Controllers;


import Project.Trello.Modules.Board.Models.Board;
import Project.Trello.Modules.Board.Services.BoardService;
import Project.Trello.Modules.Workspace.Models.Workspace;
import Project.Trello.Modules.Workspace.Repository.WorkspaceRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceController {

    WorkspaceRepository workspaceRepository;
    BoardService boardService;

    public WorkspaceController(WorkspaceRepository workspaceRepository, BoardService boardService) {
        this.workspaceRepository = workspaceRepository;
        this.boardService = boardService;
    }

    @PostMapping("/create")
    public Workspace create(Workspace workspace) {
        if (workspace.boards != null) {
            for (Board board: workspace.boards) {
                boardService.boardRepository.save(board);
            }
        }

        return workspaceRepository.save(workspace);
    }

}
