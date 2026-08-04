package com.finflow.bank.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.finflow.bank.enums.FDStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fixed_deposits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FixedDeposit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fdId;

    @Column(nullable = false, unique = true)
    private String fdNumber;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(nullable = false)
    private Double principalAmount;

    @Column(nullable = false)
    private Double interestRate;

    @Column(nullable = false)
    private Integer tenureMonths;

    @Column(nullable = false)
    private Double maturityAmount;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate maturityDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FDStatus status;

    private LocalDateTime createdAt;
}