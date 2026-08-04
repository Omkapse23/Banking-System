package com.finflow.bank.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.finflow.bank.dto.FixedDepositRequest;
import com.finflow.bank.dto.FixedDepositResponse;
import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.FixedDeposit;
import com.finflow.bank.enums.FDStatus;
import com.finflow.bank.exception.ResourceNotFoundException;
import com.finflow.bank.repository.AccountRepository;
import com.finflow.bank.repository.FixedDepositRepository;

@Service
public class FixedDepositService {

    private final FixedDepositRepository fixedDepositRepository;
    private final AccountRepository accountRepository;

    public FixedDepositService(FixedDepositRepository fixedDepositRepository,
                               AccountRepository accountRepository) {
        this.fixedDepositRepository = fixedDepositRepository;
        this.accountRepository = accountRepository;
    }

    public FixedDepositResponse createFD(FixedDepositRequest request) {
        Optional<Account> accountOptional =
        accountRepository.findByAccountNumber(request.getAccountNumber());

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        if(account.getBalance() < request.getPrincipalAmount()) {
            throw new RuntimeException("Insufficient Balance");
        }

        double interestRate;

        if(request.getTenureMonths() == 6) {
            interestRate = 6.5;
        }
        else if(request.getTenureMonths() == 12) {
            interestRate = 7.0;
        }
        else if(request.getTenureMonths() == 24) {
            interestRate = 7.25;
        }
        else if(request.getTenureMonths() == 36) {
            interestRate = 7.5;
        }
        else {
            interestRate = 6.0;
        }

        double time = request.getTenureMonths() / 12.0;

        double interest = (request.getPrincipalAmount() * interestRate * time) / 100;

        double maturityAmount = request.getPrincipalAmount() + interest;

        FixedDeposit fixedDeposit = new FixedDeposit();

        fixedDeposit.setFdNumber("FD" + System.currentTimeMillis());

        fixedDeposit.setAccount(account);

        fixedDeposit.setPrincipalAmount(request.getPrincipalAmount());

        fixedDeposit.setInterestRate(interestRate);

        fixedDeposit.setTenureMonths(request.getTenureMonths());

        fixedDeposit.setMaturityAmount(maturityAmount);

        fixedDeposit.setStartDate(LocalDate.now());

        fixedDeposit.setMaturityDate(
                LocalDate.now().plusMonths(request.getTenureMonths()));

        fixedDeposit.setStatus(FDStatus.ACTIVE);

        fixedDeposit.setCreatedAt(LocalDateTime.now());

        account.setBalance(account.getBalance() - request.getPrincipalAmount());

        accountRepository.save(account);

        fixedDepositRepository.save(fixedDeposit);

        FixedDepositResponse response = new FixedDepositResponse();

        response.setFdNumber(fixedDeposit.getFdNumber());
        response.setAccountNumber(account.getAccountNumber());
        response.setPrincipalAmount(fixedDeposit.getPrincipalAmount());
        response.setInterestRate(fixedDeposit.getInterestRate());
        response.setTenureMonths(fixedDeposit.getTenureMonths());
        response.setMaturityAmount(fixedDeposit.getMaturityAmount());
        response.setMaturityDate(fixedDeposit.getMaturityDate());
        response.setStatus(fixedDeposit.getStatus());

        return response;
    }

    public List<FixedDepositResponse> getAllFDs(String accountNumber) {

        Optional<Account> accountOptional =
                accountRepository.findByAccountNumber(accountNumber);

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        List<FixedDeposit> fixedDeposits =
                fixedDepositRepository.findByAccount(account);

        List<FixedDepositResponse> responseList = new ArrayList<>();

        for(FixedDeposit fd : fixedDeposits) {
            FixedDepositResponse response = new FixedDepositResponse();

            response.setFdNumber(fd.getFdNumber());
            response.setAccountNumber(fd.getAccount().getAccountNumber());
            response.setPrincipalAmount(fd.getPrincipalAmount());
            response.setInterestRate(fd.getInterestRate());
            response.setTenureMonths(fd.getTenureMonths());
            response.setMaturityAmount(fd.getMaturityAmount());
            response.setMaturityDate(fd.getMaturityDate());
            response.setStatus(fd.getStatus());

            responseList.add(response);
        }

        return responseList;
    }

    public FixedDepositResponse getFD(String fdNumber) {

        Optional<FixedDeposit> fdOptional =
                fixedDepositRepository.findByFdNumber(fdNumber);

        if(fdOptional.isEmpty()) {
            throw new ResourceNotFoundException("FD not found");
        }

        FixedDeposit fd = fdOptional.get();

        FixedDepositResponse response = new FixedDepositResponse();

        response.setFdNumber(fd.getFdNumber());
        response.setAccountNumber(fd.getAccount().getAccountNumber());
        response.setPrincipalAmount(fd.getPrincipalAmount());
        response.setInterestRate(fd.getInterestRate());
        response.setTenureMonths(fd.getTenureMonths());
        response.setMaturityAmount(fd.getMaturityAmount());
        response.setMaturityDate(fd.getMaturityDate());
        response.setStatus(fd.getStatus());

        return response;
    }

    public FixedDepositResponse closeFD(String fdNumber) {

        Optional<FixedDeposit> fdOptional =
                fixedDepositRepository.findByFdNumber(fdNumber);

        if(fdOptional.isEmpty()) {
            throw new ResourceNotFoundException("FD not found");
        }

        FixedDeposit fd = fdOptional.get();

        if(fd.getStatus() == FDStatus.CLOSED) {
            throw new RuntimeException("FD is already closed");
        }

        Account account = fd.getAccount();

        // Credit maturity amount back to account
        account.setBalance(account.getBalance() + fd.getMaturityAmount());

        accountRepository.save(account);

        // Update FD status
        fd.setStatus(FDStatus.CLOSED);

        fixedDepositRepository.save(fd);

        // Prepare response
        FixedDepositResponse response = new FixedDepositResponse();

        response.setFdNumber(fd.getFdNumber());
        response.setAccountNumber(account.getAccountNumber());
        response.setPrincipalAmount(fd.getPrincipalAmount());
        response.setInterestRate(fd.getInterestRate());
        response.setTenureMonths(fd.getTenureMonths());
        response.setMaturityAmount(fd.getMaturityAmount());
        response.setMaturityDate(fd.getMaturityDate());
        response.setStatus(fd.getStatus());

        return response;
    }
}