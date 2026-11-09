package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.UserInteraction;

public interface UserInteractionRepository extends JpaRepository<UserInteraction, Long> {
}
