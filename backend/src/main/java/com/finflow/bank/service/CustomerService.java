package com.finflow.bank.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finflow.bank.dto.CustomerLoginRequest;
import com.finflow.bank.dto.CustomerLoginResponse;
import com.finflow.bank.dto.CustomerRegistrationRequest;
import com.finflow.bank.entity.Customer;
import com.finflow.bank.enums.CustomerStatus;
import com.finflow.bank.repository.CustomerRepository;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void registerCustomer(CustomerRegistrationRequest request) {
        if(customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if(customerRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already registerd");
        }

        Customer customer = new Customer();

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setGender(request.getGender());
        customer.setDob(request.getDob());
        customer.setEmail(request.getEmail());
        customer.setPassword(request.getPassword());
        customer.setPhone(request.getPhone());
        customer.setAadhaar(request.getAadhaar());
        customer.setPan(request.getPan());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());
        customer.setStatus(CustomerStatus.ACTIVE);
        customer.setCreatedAt(LocalDateTime.now());

        customerRepository.save(customer);
    }

    public CustomerLoginResponse loginCustomer(CustomerLoginRequest request) {
        Optional<Customer> customerOptional = customerRepository.findByEmail(request.getEmail());

        if(customerOptional.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }

        Customer customer = customerOptional.get();

        if(!customer.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        CustomerLoginResponse response = new CustomerLoginResponse();

        response.setCustomerId(customer.getId());
        response.setFirstName(customer.getFirstName());
        response.setLastName(customer.getLastName());
        response.setEmail(customer.getEmail());
        response.setMessage("Login Successful");

        return response;
    }
}
