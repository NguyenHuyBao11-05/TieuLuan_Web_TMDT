package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
