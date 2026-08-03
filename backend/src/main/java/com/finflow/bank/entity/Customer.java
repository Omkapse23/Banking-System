package com.finflow.bank.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.finflow.bank.enums.CustomerStatus;
import com.finflow.bank.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable=false, length=100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate dob;

    @Column(nullable = false, unique = true, length=100)
    private String email;

    @Column(nullable=false) 
    private String password;

    @Column(nullable=false, unique=true, length=10)
    private String phone;

    @Column(nullable=false, unique=true, length=12) 
    private String aadhaar;

    @Column(nullable=false, unique=true, length=10)
    private String pan;

    @Column(nullable=false, length=255)
    private String address;

    @Column(nullable=false, length=50)
    private String city;

    @Column(nullable=false, length=50)
    private String state;

    @Column(nullable=false, length = 10)
    private String pincode;

    @Enumerated(EnumType.STRING)
    private CustomerStatus status;

    private LocalDateTime createdAt;

}
