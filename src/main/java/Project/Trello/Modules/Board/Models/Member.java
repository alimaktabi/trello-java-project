package Project.Trello.Modules.Board.Models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @ManyToOne
    public Role role;

    public Date joinedAt;


    @ManyToOne
    public Board board;
}
