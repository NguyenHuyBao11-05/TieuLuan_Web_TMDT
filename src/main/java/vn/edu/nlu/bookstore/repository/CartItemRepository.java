package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
