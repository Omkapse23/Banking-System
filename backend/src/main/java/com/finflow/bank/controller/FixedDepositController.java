package com.finflow.bank.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.bank.dto.FixedDepositRequest;
import com.finflow.bank.dto.FixedDepositResponse;
import com.finflow.bank.service.FixedDepositService;

@RestController
@RequestMapping("/api/fixed-deposits")
@CrossOrigin(origins = "http://localhost:5173")
public class FixedDepositController {

    private final FixedDepositService fixedDepositService;

    public FixedDepositController(FixedDepositService fixedDepositService) {
        this.fixedDepositService = fixedDepositService;
    }

    @PostMapping
    public ResponseEntity<FixedDepositResponse> createFD(
            @RequestBody FixedDepositRequest request) {

        return ResponseEntity.ok(
                fixedDepositService.createFD(request));
    }

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<List<FixedDepositResponse>> getAllFDs(
            @PathVariable String accountNumber) {

        return ResponseEntity.ok(
                fixedDepositService.getAllFDs(accountNumber));
    }

    @GetMapping("/{fdNumber}")
    public ResponseEntity<FixedDepositResponse> getFD(
            @PathVariable String fdNumber) {

        return ResponseEntity.ok(
                fixedDepositService.getFD(fdNumber));
    }

    @PutMapping("/close/{fdNumber}")
    public ResponseEntity<FixedDepositResponse> closeFD(
            @PathVariable String fdNumber) {

        return ResponseEntity.ok(
                fixedDepositService.closeFD(fdNumber));
    }
}