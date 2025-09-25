package org.example.fullstackproject.Service;


import org.apache.catalina.User;
import org.example.fullstackproject.model.Users;
import org.example.fullstackproject.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }

    public Users findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public Users createUser(Users users){
        return userRepository.save(users);
    }

    public void deleteUser(long id){
        userRepository.deleteById(id);
    }

    public Users updateUser(long id, Users updatedUser){
        return userRepository.findById(id)
                .map(existing ->{
                    existing.setName(updatedUser.getName());
                    existing.setEmail(updatedUser.getEmail());
                    existing.setUserName(updatedUser.getUserName());
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("User not found " +id));
    }




}
