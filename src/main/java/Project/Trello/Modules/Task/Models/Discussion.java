package Project.Trello.Modules.Task.Models;

import Project.Trello.Modules.Account.Models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    public String content;


    public String media;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Task.class)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    public Task task;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
    public User user;
}
