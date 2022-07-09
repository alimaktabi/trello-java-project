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
    private long id;

    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    public State state;

    @OneToMany
    public Set<User> assignedTo;

    public String description;

    public int order;

    public Date date;
}
