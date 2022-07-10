package Project.Trello.Modules.Task.Models;

import Project.Trello.Modules.Board.Models.Board;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Entity
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank()
    public String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    @ManyToOne
    public Board board;

    public Integer orderInt;

    @OneToMany(mappedBy = "state", fetch = FetchType.EAGER)
    public Set<Task> tasks;
}

