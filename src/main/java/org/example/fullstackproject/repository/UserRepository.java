package org.example.fullstackproject.repository;

import org.apache.catalina.User;
import org.example.fullstackproject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
}
