package org.example.fullstackproject.Common;


import org.example.fullstackproject.Service.UserService;
import org.example.fullstackproject.model.Users;
import org.example.fullstackproject.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class InitData implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;

    InitData(UserService userService, UserRepository userRepository){
        this.userService=userService;
        this.userRepository=userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        Users u1 = new Users();
        u1.setName("Sofus");
        u1.setEmail("Sofus@email.dk");
        u1.setUserName("The chosen one");

        Users u2 = new Users();
        u2.setName("Gustav");
        u2.setEmail("Gustav@email.dk");
        u2.setUserName("White Walker");

        userRepository.save(u1);
        userRepository.save(u2);

    }
}
