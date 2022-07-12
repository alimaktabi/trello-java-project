package Project.Trello.Modules.Workspace.Repository;


import Project.Trello.Modules.Workspace.Models.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}
