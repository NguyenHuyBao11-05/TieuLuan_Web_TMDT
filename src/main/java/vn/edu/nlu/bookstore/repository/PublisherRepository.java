package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
