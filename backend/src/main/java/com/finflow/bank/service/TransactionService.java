package com.finflow.bank.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.finflow.bank.dto.DepositRequest;
import com.finflow.bank.dto.TransactionResponse;
import com.finflow.bank.dto.TransferRequest;
import com.finflow.bank.dto.WithdrawRequest;
import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.Transaction;
import com.finflow.bank.enums.TransactionStatus;
import com.finflow.bank.enums.TransactionType;
import com.finflow.bank.exception.ResourceNotFoundException;
import com.finflow.bank.repository.AccountRepository;
import com.finflow.bank.repository.TransactionRepository;

import jakarta.transaction.Transactional;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(AccountRepository accountRepository,
                              TransactionRepository transactionRepository) {

        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void deposit(DepositRequest request) {

        Optional<Account> accountOptional =
                accountRepository.findByAccountNumber(request.getAccountNumber());

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        account.setBalance(account.getBalance() + request.getAmount());

        accountRepository.save(account);

        Transaction transaction = new Transaction();

        transaction.setToAccount(account);
        transaction.setTransactionType(TransactionType.DEPOSIT);
        transaction.setAmount(request.getAmount());
        transaction.setBalanceAfterTransaction(account.getBalance());
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setRemarks("Cash Deposit");
        transaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(transaction);
    }

    @Transactional
    public void withdraw(WithdrawRequest request) {

        Optional<Account> accountOptional =
                accountRepository.findByAccountNumber(request.getAccountNumber());

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        if(account.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(account.getBalance() - request.getAmount());

        accountRepository.save(account);

        Transaction transaction = new Transaction();

        transaction.setFromAccount(account);
        transaction.setTransactionType(TransactionType.WITHDRAW);
        transaction.setAmount(request.getAmount());
        transaction.setBalanceAfterTransaction(account.getBalance());
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setRemarks("Cash Withdrawal");
        transaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(transaction);
    }

    @Transactional
    public void transfer(TransferRequest request) {

        Optional<Account> senderOptional =
                accountRepository.findByAccountNumber(request.getFromAccountNumber());

        if(senderOptional.isEmpty()) {
            throw new ResourceNotFoundException("Sender account not found");
        }

        Optional<Account> receiverOptional =
                accountRepository.findByAccountNumber(request.getToAccountNumber());

        if(receiverOptional.isEmpty()) {
            throw new ResourceNotFoundException("Receiver account not found");
        }

        Account sender = senderOptional.get();
        Account receiver = receiverOptional.get();

        if(sender.getAccountNumber().equals(receiver.getAccountNumber())) {
            throw new RuntimeException("Cannot transfer to same account");
        }

        if(sender.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient Balance");
        }

        sender.setBalance(sender.getBalance() - request.getAmount());
        receiver.setBalance(receiver.getBalance() + request.getAmount());

        accountRepository.save(sender);
        accountRepository.save(receiver);

        Transaction transaction = new Transaction();

        transaction.setFromAccount(sender);
        transaction.setToAccount(receiver);
        transaction.setTransactionType(TransactionType.TRANSFER);
        transaction.setAmount(request.getAmount());
        transaction.setBalanceAfterTransaction(sender.getBalance());
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setRemarks(request.getRemarks());
        transaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(transaction);
    }

    public List<TransactionResponse> getTransactionHistory(String accountNumber) {
        Optional<Account> accountOptional = accountRepository.findByAccountNumber(accountNumber);

        if(accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found");
        }

        Account account = accountOptional.get();

        List<Transaction> transactions = transactionRepository.findByFromAccountOrToAccount(account, account);

        List<TransactionResponse> responseList = new ArrayList<>();

        for(Transaction transaction : transactions) {
            TransactionResponse response = new TransactionResponse();

            response.setTransactionId(transaction.getTransactionId());
            response.setTransactionType(transaction.getTransactionType());
            response.setAmount(transaction.getAmount());
            response.setBalanceAfterTransaction(transaction.getBalanceAfterTransaction());
            response.setTransactionStatus(transaction.getTransactionStatus());
            response.setRemarks(transaction.getRemarks());
            response.setTransactionDate(transaction.getTransactionDate());

            responseList.add(response);
        }
        return responseList;
    }

}