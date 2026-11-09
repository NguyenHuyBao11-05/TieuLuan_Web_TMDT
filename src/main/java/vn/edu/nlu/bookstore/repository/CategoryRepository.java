package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
