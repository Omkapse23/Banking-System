package com.finflow.bank.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.finflow.bank.dto.LoanRequest;
import com.finflow.bank.dto.LoanResponse;
import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.Loan;
import com.finflow.bank.enums.LoanStatus;
import com.finflow.bank.exception.ResourceNotFoundException;
import com.finflow.bank.repository.AccountRepository;
import com.finflow.bank.repository.LoanRepository;

import jakarta.transaction.Transactional;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    public LoanService(LoanRepository loanRepository, AccountRepository accountRepository) {

        this.loanRepository = loanRepository;
        this.accountRepository = accountRepository;
    }

    public LoanResponse applyLoan(LoanRequest request) {
        Optional<Account> accountOptional =
        accountRepository.findByAccountNumber(request.getAccountNumber());

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        double interestRate;

        switch (request.getLoanType()) {

            case HOME:
                interestRate = 8.5;
                break;

            case PERSONAL:
                interestRate = 12.0;
                break;

            case VEHICLE:
                interestRate = 9.0;
                break;

            case EDUCATION:
                interestRate = 7.0;
                break;

            case GOLD:
                interestRate = 10.0;
                break;

            default:
                interestRate = 10.0;
        }

        double totalInterest = (request.getLoanAmount() * interestRate * request.getTenureMonths()) / (100 * 12);

        double totalAmount = request.getLoanAmount() + totalInterest;

        double emi = totalAmount / request.getTenureMonths();

        Loan loan = new Loan();

        loan.setLoanNumber("LN" + System.currentTimeMillis());
        loan.setAccount(account);
        loan.setLoanType(request.getLoanType());
        loan.setLoanAmount(request.getLoanAmount());
        loan.setInterestRate(interestRate);
        loan.setTenureMonths(request.getTenureMonths());
        loan.setEmiAmount(emi);
        loan.setRemainingAmount(totalAmount);
        loan.setStatus(LoanStatus.PENDING);
        loan.setCreatedAt(LocalDateTime.now());

        loanRepository.save(loan);

        return mapToResponse(loan);
    }

    @Transactional
    public LoanResponse approveLoan(String loanNumber) {

        Optional<Loan> loanOptional = loanRepository.findByLoanNumber(loanNumber);

        if(loanOptional.isEmpty()) {
            throw new ResourceNotFoundException("Loan not found");
        }

        Loan loan = loanOptional.get();

        if(loan.getStatus() != LoanStatus.PENDING) {
            throw new RuntimeException("Loan is already processed");
        }

            Account account = loan.getAccount();

            account.setBalance(account.getBalance() + loan.getLoanAmount());

            accountRepository.save(account);

            loan.setStatus(LoanStatus.APPROVED);
            loanRepository.save(loan);

            return mapToResponse(loan);
    }

    public List<LoanResponse> getAllLoans(String accountNumber) {

        Optional<Account> accountOptional = accountRepository.findByAccountNumber(accountNumber);

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        List<Loan> loans = loanRepository.findByAccount(account);

        List<LoanResponse> responseList = new ArrayList<>();

        for(Loan loan : loans) {
            responseList.add(mapToResponse(loan));
        }

        return responseList;
    }

    public LoanResponse getLoan(String loanNumber) {

        Optional<Loan> loanOptional = loanRepository.findByLoanNumber(loanNumber);

        if(loanOptional.isEmpty()) {
            throw new ResourceNotFoundException("Loan not found");
        }

        Loan loan = loanOptional.get();

        return mapToResponse(loan);
    }

    @Transactional
    public LoanResponse payEmi(String loanNumber) {
        Optional<Loan> loanOptional = loanRepository.findByLoanNumber(loanNumber);

        if(loanOptional.isEmpty()) {
            throw new ResourceNotFoundException("Loan not found");
        }

        Loan loan = loanOptional.get();

        if(loan.getStatus() != LoanStatus.APPROVED) {
            throw new RuntimeException("Loan is not approved");
        }

        Account account = loan.getAccount();

        if(account.getBalance() < loan.getEmiAmount()) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(account.getBalance() - loan.getEmiAmount());

        accountRepository.save(account);

        loan.setRemainingAmount(loan.getRemainingAmount() - loan.getEmiAmount());

        if(loan.getRemainingAmount() <= 0) {

            loan.setRemainingAmount(0.0);

            loan.setStatus(LoanStatus.CLOSED);
        }

        loanRepository.save(loan);

        return mapToResponse(loan);
    }

    public LoanResponse rejectLoan(String loanNumber) {
        Optional<Loan> loanOptional =loanRepository.findByLoanNumber(loanNumber);

        if(loanOptional.isEmpty()) {
            throw new ResourceNotFoundException("Loan not found");
        }

        Loan loan = loanOptional.get();

        if(loan.getStatus() != LoanStatus.PENDING) {
            throw new RuntimeException("Loan is already processed");
        }

        loan.setStatus(LoanStatus.REJECTED);

        loanRepository.save(loan);

        return mapToResponse(loan);
    }

    //helper method
    private LoanResponse mapToResponse(Loan loan) {

    LoanResponse response = new LoanResponse();

    response.setLoanNumber(loan.getLoanNumber());
    response.setAccountNumber(loan.getAccount().getAccountNumber());
    response.setLoanType(loan.getLoanType());
    response.setLoanAmount(loan.getLoanAmount());
    response.setInterestRate(loan.getInterestRate());
    response.setTenureMonths(loan.getTenureMonths());
    response.setEmiAmount(loan.getEmiAmount());
    response.setRemainingAmount(loan.getRemainingAmount());
    response.setStatus(loan.getStatus());

    return response;
}
}