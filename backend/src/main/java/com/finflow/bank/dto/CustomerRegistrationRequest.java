package com.finflow.bank.dto;

import java.time.LocalDate;

import com.finflow.bank.enums.Gender;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerRegistrationRequest {
    
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dob;
    private String email;
    private String password;
    private String phone;
    private String aadhaar;
    private String pan;
    private String address;
    private String city;
    private String state;
    private String pincode;
}
