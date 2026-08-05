package com.finflow.bank.exception;

public class LoanNotApprovedException extends RuntimeException {

    public LoanNotApprovedException(String message) {
        super(message);
    }
}