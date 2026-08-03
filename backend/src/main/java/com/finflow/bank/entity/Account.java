package com.finflow.bank.entity;

import java.time.LocalDateTime;

import com.finflow.bank.enums.AccountStatus;
import com.finflow.bank.enums.AccountType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    
    @Id

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable=false, length=20, unique=true)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private AccountType accountType;

    @Column(nullable=false)
    private Double balance;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private AccountStatus status;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "customerId", nullable=false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "branchId", nullable=false)
    private Branch branch;
}
