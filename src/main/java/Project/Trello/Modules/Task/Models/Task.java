package Project.Trello.Modules.Task.Models;

import Project.Trello.Modules.Account.Models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    public State state;

    public String name;

    @OneToMany
    public Set<User> assignedTo;

    @OneToMany
    public Set<Discussion> discussions;

    public String description;

    public Integer orderInt;

    public Date date;
}
