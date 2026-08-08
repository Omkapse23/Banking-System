package com.finflow.bank.admin.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponse {

    private Long adminId;

    private String adminName;

    private String email;

    private String role;

}