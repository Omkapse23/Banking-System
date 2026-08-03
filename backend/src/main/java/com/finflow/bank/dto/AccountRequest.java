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
public class AccountRequest {

    private Long customerId;
    private Long branchId;
    private AccountType accountType;

}