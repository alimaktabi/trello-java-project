package Project.Trello.Modules.Account.Repository;

import Project.Trello.Modules.Account.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);

    public User findByToken(String token);

}
