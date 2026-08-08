package com.finflow.bank.admin.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.finflow.bank.admin.dto.AdminLoginRequest;
import com.finflow.bank.admin.dto.AdminResponse;
import com.finflow.bank.admin.entity.Admin;
import com.finflow.bank.exception.ResourceNotFoundException;
import com.finflow.bank.admin.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {

        this.adminRepository = adminRepository;

    }

    public AdminResponse login(AdminLoginRequest request) {

        Optional<Admin> adminOptional =
                adminRepository.findByEmail(request.getEmail());

        if(adminOptional.isEmpty()) {

            throw new ResourceNotFoundException("Invalid Email");

        }

        Admin admin = adminOptional.get();

        if(!admin.getPassword().equals(request.getPassword())) {

            throw new RuntimeException("Invalid Password");

        }

        return new AdminResponse(

                admin.getAdminId(),
                admin.getAdminName(),
                admin.getEmail(),
                admin.getRole()

        );

    }

}