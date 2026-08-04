package com.finflow.bank.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.bank.dto.DepositRequest;
import com.finflow.bank.dto.TransactionResponse;
import com.finflow.bank.dto.TransferRequest;
import com.finflow.bank.dto.WithdrawRequest;
import com.finflow.bank.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestBody DepositRequest request){

        transactionService.deposit(request);

        return ResponseEntity.ok("Amount Deposited Successfully");
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody WithdrawRequest request) {

        transactionService.withdraw(request);

        return ResponseEntity.ok("Amount Withdrawn Successfully");
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {

        transactionService.transfer(request);

        return ResponseEntity.ok("Amount Transferred Successfully");
    }

    @GetMapping("/history/{accountNumber}")
    public ResponseEntity<List<TransactionResponse>> getTransactionHistory(@PathVariable String accountNumber) {

        return ResponseEntity.ok(
                transactionService.getTransactionHistory(accountNumber));
    }

}