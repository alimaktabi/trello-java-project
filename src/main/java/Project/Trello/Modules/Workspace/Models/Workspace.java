package Project.Trello.Modules.Workspace.Models;

import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Board.Models.Board;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Workspace {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long id;


    @OneToMany
    public Set<User> users;

    public String name;

    public Date createdAt;

    @OneToMany
    public Set<Board> boards;
}
