package vn.edu.nlu.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.bookstore.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
