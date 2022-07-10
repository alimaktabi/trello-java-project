package Project.Trello.Modules.Board.Models;


import Project.Trello.Modules.Account.Models.User;
import Project.Trello.Modules.Task.Models.State;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Name is required")
    public String name;

    public Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    public User mainAdmin;

    @OneToMany(fetch = FetchType.EAGER)
    public Set<User> users;

    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER, targetEntity = State.class)
    @OrderBy("orderInt")
    public Set<State> states;

    public String color;
}
