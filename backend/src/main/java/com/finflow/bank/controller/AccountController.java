package com.finflow.bank.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.bank.dto.AccountRequest;
import com.finflow.bank.dto.AccountResponse;
import com.finflow.bank.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@RequestBody AccountRequest request) {

        return ResponseEntity.ok(accountService.createAccount(request)
        );
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<AccountResponse> getAccountByCustomerId(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(

                accountService.getAccountByCustomerId(customerId)

        );

    }
}