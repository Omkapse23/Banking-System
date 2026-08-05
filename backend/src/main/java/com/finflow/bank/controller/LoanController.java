package com.finflow.bank.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.bank.dto.LoanRequest;
import com.finflow.bank.dto.LoanResponse;
import com.finflow.bank.service.LoanService;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping
    public ResponseEntity<LoanResponse> applyLoan(@RequestBody LoanRequest request) {

        return ResponseEntity.ok(loanService.applyLoan(request));
    }

    @PutMapping("/approve/{loanNumber}")
    public ResponseEntity<LoanResponse> approveLoan(@PathVariable String loanNumber) {
        return ResponseEntity.ok(loanService.approveLoan(loanNumber));
    }

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<List<LoanResponse>> getAllLoans(@PathVariable String accountNumber) {

        return ResponseEntity.ok(loanService.getAllLoans(accountNumber));
    }

    @GetMapping("/{loanNumber}")
    public ResponseEntity<LoanResponse> getLoan(@PathVariable String loanNumber) {

        return ResponseEntity.ok(loanService.getLoan(loanNumber));
    }

    @PutMapping("/pay-emi/{loanNumber}")
    public ResponseEntity<LoanResponse> payEmi(@PathVariable String loanNumber) {

        return ResponseEntity.ok(loanService.payEmi(loanNumber));
    }

    @PutMapping("/reject/{loanNumber}")
    public ResponseEntity<LoanResponse> rejectLoan(@PathVariable String loanNumber) {

        return ResponseEntity.ok(loanService.rejectLoan(loanNumber));
    }
}