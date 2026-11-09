package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
