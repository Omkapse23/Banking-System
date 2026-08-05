package com.finflow.bank.exception;

public class LoanAlreadyProcessedException extends RuntimeException {

    public LoanAlreadyProcessedException(String message) {
        super(message);
    }
}