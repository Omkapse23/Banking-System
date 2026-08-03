package com.finflow.bank.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finflow.bank.dto.AccountRequest;
import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.Branch;
import com.finflow.bank.entity.Customer;
import com.finflow.bank.enums.AccountStatus;
import com.finflow.bank.repository.AccountRepository;
import com.finflow.bank.repository.BranchRepository;
import com.finflow.bank.repository.CustomerRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BranchRepository branchRepository;

    public AccountService(AccountRepository accountRepository,
                          CustomerRepository customerRepository,
                          BranchRepository branchRepository) {
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
        this.branchRepository = branchRepository;
    }

    public void createAccount(AccountRequest request) {

        Optional<Customer> customerOptional =
                customerRepository.findById(request.getCustomerId());

        if (customerOptional.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }

        Optional<Branch> branchOptional =
                branchRepository.findById(request.getBranchId());

        if (branchOptional.isEmpty()) {
            throw new RuntimeException("Branch not found");
        }

        Customer customer = customerOptional.get();
        Branch branch = branchOptional.get();

        Account account = new Account();

        account.setCustomer(customer);
        account.setBranch(branch);

        account.setAccountType(request.getAccountType());

        account.setBalance(0.0);

        account.setStatus(AccountStatus.ACTIVE);

        account.setCreatedAt(LocalDateTime.now());

        // Temporary account number
        account.setAccountNumber(String.valueOf(System.currentTimeMillis()));

        accountRepository.save(account);
    }
}