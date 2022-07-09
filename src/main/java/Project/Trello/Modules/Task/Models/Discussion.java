package Project.Trello.Modules.Task.Models;

import Project.Trello.Modules.Account.Models.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public String content;


    public String mediaUrl;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Task.class)
    public Task task;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
    public User user;
}
