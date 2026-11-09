package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
