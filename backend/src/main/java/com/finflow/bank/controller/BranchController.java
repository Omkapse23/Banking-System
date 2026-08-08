package com.finflow.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finflow.bank.dto.BranchRequest;
import com.finflow.bank.dto.BranchResponse;
import com.finflow.bank.service.BranchService;

@RestController
@RequestMapping("/api/branches")
@CrossOrigin(origins = "http://localhost:5173")
public class BranchController {
    @Autowired
    private BranchService branchService;

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @PostMapping
    public ResponseEntity<String> createBranch(@RequestBody BranchRequest request) {
        branchService.createBranch(request);
        return ResponseEntity.ok("Branch Created Succesfully");
    }

    @GetMapping
    public ResponseEntity<List<BranchResponse>> getAllBranches() {

        return ResponseEntity.ok(branchService.getAllBranches());

    }

}
