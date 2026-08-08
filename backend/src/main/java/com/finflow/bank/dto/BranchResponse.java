package com.finflow.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BranchResponse {

    private Long branchId;
    private String branchName;
    private String branchCode;
    private String ifscCode;
    private String city;
    private String state;

}