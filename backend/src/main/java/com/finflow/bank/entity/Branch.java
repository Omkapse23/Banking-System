package com.finflow.bank.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "branches")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Branch {
    @Id

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long branchId;

    @Column(nullable=false, length=100)
    private String branchName;

    @Column(nullable=false, length=10)
    private String branchCode;

    @Column(nullable=false, length=11)
    private String ifscCode;

    @Column(nullable=false, length=100)
    private String address;

    @Column(nullable=false, length=30)
    private String city;

    @Column(nullable=false, length=20)
    private String state;

    private LocalDateTime createdAt;
}
