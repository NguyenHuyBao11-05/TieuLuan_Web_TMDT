package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
