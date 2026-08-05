package com.finflow.bank.dto;

import com.finflow.bank.enums.LoanType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequest {

    private String accountNumber;

    private LoanType loanType;

    private Double loanAmount;

    private Integer tenureMonths;
}