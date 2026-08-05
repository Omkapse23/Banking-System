package com.finflow.bank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

    boolean existsByLoanNumber(String loanNumber);

    Optional<Loan> findByLoanNumber(String loanNumber);

    List<Loan> findByAccount(Account account);

}