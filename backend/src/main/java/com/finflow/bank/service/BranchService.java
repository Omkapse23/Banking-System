package com.finflow.bank.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finflow.bank.dto.BranchRequest;
import com.finflow.bank.dto.BranchResponse;
import com.finflow.bank.entity.Branch;
import com.finflow.bank.repository.BranchRepository;

@Service
public class BranchService {
    @Autowired
    private BranchRepository branchRepository;

    public BranchService(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }
    
    public void createBranch(BranchRequest request) {
        if(branchRepository.existsByBranchCode(request.getBranchCode())) {
            throw new RuntimeException("Branch Code already exist");
        }

        if(branchRepository.existsByIfscCode(request.getIfscCode())) {
            throw new RuntimeException("IFSC code already exists");
        }
        
        Branch branch = new Branch();

        branch.setBranchName(request.getBranchName());
        branch.setBranchCode(request.getBranchCode());
        branch.setIfscCode(request.getIfscCode());
        branch.setAddress(request.getAddress());
        branch.setCity(request.getCity());
        branch.setState(request.getState());
        branch.setCreatedAt(LocalDateTime.now());

        branchRepository.save(branch);
    }

    public List<BranchResponse> getAllBranches() {

        return branchRepository.findAll()
                .stream()
                .map(branch -> new BranchResponse(
                        branch.getBranchId(),
                        branch.getBranchName(),
                        branch.getBranchCode(),
                        branch.getIfscCode(),
                        branch.getCity(),
                        branch.getState()
                ))
                .toList();

    }
}
