package Project.Trello.Modules.Account.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;


    @NotBlank(message = "First Name is required")
    public String firstName;

    @NotBlank(message = "Last Name is required")
    public String lastName;

    @NotBlank(message = "Email is required")
    @Column(unique = true)
    @Email
    public String email;

    @NotBlank
    @Column(unique = true)
    public String phoneNumber;

    @NotBlank
    public String password;

    public void setPassword(String password) {
        this.password = password;
    }

    public String token;

    public String image;

}
