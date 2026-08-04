package com.finflow.bank.dto;

import java.time.LocalDateTime;

import com.finflow.bank.enums.TransactionStatus;
import com.finflow.bank.enums.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Long transactionId;
    private TransactionType transactionType;
    private Double amount;
    private Double balanceAfterTransaction;
    private TransactionStatus transactionStatus;
    private String remarks;
    private LocalDateTime transactionDate;
}