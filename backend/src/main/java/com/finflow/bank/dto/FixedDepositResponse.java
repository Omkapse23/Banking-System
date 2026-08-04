package com.finflow.bank.dto;

import java.time.LocalDate;

import com.finflow.bank.enums.FDStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FixedDepositResponse {

    private String fdNumber;
    private String accountNumber;
    private Double principalAmount;
    private Double interestRate;
    private Integer tenureMonths;
    private Double maturityAmount;
    private LocalDate maturityDate;
    private FDStatus status;
}