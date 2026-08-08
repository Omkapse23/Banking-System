package com.finflow.bank.admin.controller;

import org.springframework.web.bind.annotation.*;

import com.finflow.bank.admin.dto.AdminLoginRequest;
import com.finflow.bank.admin.dto.AdminResponse;
import com.finflow.bank.admin.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {

        this.adminService = adminService;

    }

    @PostMapping("/login")
    public AdminResponse login(

            @RequestBody AdminLoginRequest request) {

        return adminService.login(request);

    }

}