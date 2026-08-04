package com.finflow.bank.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.bank.dto.CustomerLoginRequest;
import com.finflow.bank.dto.CustomerLoginResponse;
import com.finflow.bank.dto.CustomerRegistrationRequest;
import com.finflow.bank.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    public CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/register")
    
    public String registerCustomer(@Valid @RequestBody CustomerRegistrationRequest request) {
        customerService.registerCustomer(request);

        return "Customer Registerd Succesfully";
    }

    @PostMapping("/login")
    public CustomerLoginResponse loginCustomer(@RequestBody CustomerLoginRequest request) {
        return customerService.loginCustomer(request);
    }
}
