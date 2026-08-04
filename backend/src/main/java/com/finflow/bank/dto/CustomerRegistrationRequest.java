package com.finflow.bank.dto;

import java.time.LocalDate;

import com.finflow.bank.enums.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerRegistrationRequest {
    
    @NotBlank(message="First Name is required")
    private String firstName;

    @NotBlank(message="Last Name is required")
    private String lastName;

    @NotNull(message="Gender is required")
    private Gender gender;

    @NotNull(message="Date of Birth is required")
    private LocalDate dob;

    @Email(message="Invalid Email")
    @NotBlank(message="Email is required")
    private String email;

    @NotBlank(message="Password is required")
    @Size(min=6, message="Password must contain at least 6 characters")
    private String password;

    @NotBlank(message="Phone is required")
    @Pattern(regexp = "\\d{10}", message = "Phone number must contain 10 digits")
    private String phone;

    @NotBlank(message="Aaddhar is required")
    @Pattern(regexp = "\\d{12}", message = "Aadhaar must contain 12 digits")
    private String aadhaar;

    @NotBlank(message = "PAN is required")
    private String pan;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message="Pincode is required")
    @Pattern(regexp = "\\d{6}", message = "Invalid Pincode")
    private String pincode;
}
