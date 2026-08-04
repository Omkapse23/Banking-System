package com.finflow.bank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finflow.bank.entity.Account;
import com.finflow.bank.entity.FixedDeposit;

@Repository
public interface FixedDepositRepository extends JpaRepository<FixedDeposit, Long> {

    boolean existsByFdNumber(String fdNumber);

    Optional<FixedDeposit> findByFdNumber(String fdNumber);

    List<FixedDeposit> findByAccount(Account account);
    

}