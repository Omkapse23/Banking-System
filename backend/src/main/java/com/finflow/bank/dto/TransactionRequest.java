package com.finflow.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {

    private String fromAccountNumber;

    private String toAccountNumber;

    private Double amount;

    private String remarks;

}