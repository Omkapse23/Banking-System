package com.finflow.bank.dto;

import com.finflow.bank.enums.LoanStatus;
import com.finflow.bank.enums.LoanType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanResponse {

    private String loanNumber;

    private String accountNumber;

    private LoanType loanType;

    private Double loanAmount;

    private Double interestRate;

    private Integer tenureMonths;

    private Double emiAmount;

    private Double remainingAmount;

    private LoanStatus status;
}