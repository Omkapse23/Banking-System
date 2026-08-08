package com.finflow.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerLoginResponse {
    private Long customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String accountNumber;
    private String message;
}
