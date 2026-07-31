package com.finflow.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finflow.bank.entity.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long>{
    boolean existsByBranchCode(String branchCode);

    boolean existsByIfscCode(String ifscCode);
}
