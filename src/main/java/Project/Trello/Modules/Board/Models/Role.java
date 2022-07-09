package Project.Trello.Modules.Board.Models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Data
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @ElementCollection
    public List<String> permissions;

}
