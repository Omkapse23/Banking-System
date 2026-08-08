package com.finflow.bank.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finflow.bank.dto.AccountRequest;
import com.finflow.bank.dto.AccountResponse;
import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.Branch;
import com.finflow.bank.entity.Customer;
import com.finflow.bank.enums.AccountStatus;
import com.finflow.bank.exception.ResourceNotFoundException;
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

    public AccountResponse createAccount(AccountRequest request) {

        if (accountRepository.findByCustomerCustomerId(request.getCustomerId()).isPresent()) {
            throw new RuntimeException("Customer already has an account");
        }

        Optional<Customer> customerOptional =
                customerRepository.findById(request.getCustomerId());

        if (customerOptional.isEmpty()) {
            throw new ResourceNotFoundException("Customer not found");
        }

        Optional<Branch> branchOptional =
                branchRepository.findById(request.getBranchId());

        if (branchOptional.isEmpty()) {
            throw new ResourceNotFoundException("Branch not found");
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

        Account savedAccount = accountRepository.save(account);

            return new AccountResponse(
            savedAccount.getAccountNumber(),
            customer.getFirstName() + " " + customer.getLastName(),
            branch.getBranchName(),
            savedAccount.getAccountType(),
            savedAccount.getBalance()
        );
    }

    public AccountResponse getAccountByCustomerId(Long customerId) {

        Account account = accountRepository
                .findByCustomerCustomerId(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Account not found"));

        return new AccountResponse(

                account.getAccountNumber(),

                account.getCustomer().getFirstName()
                        + " "
                        + account.getCustomer().getLastName(),

                account.getBranch().getBranchName(),

                account.getAccountType(),

                account.getBalance()

        );

    }
}