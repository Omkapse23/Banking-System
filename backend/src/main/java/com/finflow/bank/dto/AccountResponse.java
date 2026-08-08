package com.finflow.bank.dto;

import com.finflow.bank.enums.AccountType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse {

    private String accountNumber;
    private String customerName;
    private String branchName;
    private AccountType accountType;
    private Double balance;

}