# FinFlow – Digital Banking System

A full-stack digital banking application built using **Java, Spring Boot, React.js, and MySQL**. FinFlow provides separate customer and administrator portals for managing banking operations such as accounts, transactions, deposits, withdrawals, fund transfers, fixed deposits, loans, and EMI payments.

---

## 🚀 Project Overview

FinFlow is a web-based digital banking system designed to provide essential banking services through an easy-to-use online platform.

The system has two separate roles:

- Customer
- Administrator

Customers can perform banking operations, while administrators manage and review customer loan applications.

---

## ✨ Features

### 👤 Customer Features

- Customer Registration
- Customer Login
- Bank Account Creation
- Account Details
- Deposit Money
- Withdraw Money
- Fund Transfer
- Transaction History
- Loan Application
- Loan Status Tracking
- EMI Payment
- Fixed Deposit Creation
- Fixed Deposit Management
- Account Balance Synchronization
- Secure Logout

### 👨‍💼 Admin Features

- Separate Admin Login
- Admin Dashboard
- View Customer Loan Applications
- View Loan Details
- View Customer Occupation
- View Monthly Income
- View Employer Details
- View Work Experience
- Approve Loan Applications
- Reject Loan Applications
- Admin Logout

---

## 🔐 Role-Based Login

FinFlow provides completely separate login flows for customers and administrators.

### Customer


Customer Login
      ↓
Customer Authentication
      ↓
Customer Dashboard
      ↓
Banking Services
Administrator
Admin Login
      ↓
Admin Authentication
      ↓
Admin Dashboard
      ↓
Loan Management

A customer cannot access the administrator login flow, and an administrator cannot access the customer banking dashboard.

```text
🏗️ System Architecture
                ┌─────────────────────┐
                │      React.js       │
                │     Frontend        │
                └──────────┬──────────┘
                           │
                        Axios
                           │
                      REST APIs
                           │
                ┌──────────▼──────────┐
                │     Spring Boot     │
                │      Backend        │
                └──────────┬──────────┘
                           │
                     Spring Data JPA
                           │
                ┌──────────▼──────────┐
                │       MySQL         │
                │      Database       │
                └─────────────────────┘




🛠️ Technology Stack
Frontend
React.js
JavaScript
HTML5
CSS3
Bootstrap
Axios
React Router
React Icons
Vite
Backend
Java
Spring Boot
Spring Data JPA
Hibernate
REST APIs
Maven
Jakarta Persistence
Database
MySQL
Tools
Visual Studio Code
IntelliJ IDEA / Eclipse
MySQL Workbench
Postman
Git
GitHub



```text

📁 Project Structure
FinFlow/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/finflow/bank/
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── entity/
│   │       │       ├── dto/
│   │       │       ├── enums/
│   │       │       └── exception/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md




🧩 Main Modules
Customer Module

Responsible for:

Registration
Login
Customer information
Authentication
Account Module

Responsible for:

Account creation
Account details
Account balance
Customer-account relationship
Transaction Module

Responsible for:

Deposits
Withdrawals
Fund transfers
Transaction history
Transaction status
Loan Module

Responsible for:

Loan applications
Interest calculation
EMI calculation
Loan approval
Loan rejection
EMI payment
Remaining loan amount
Loan status
Fixed Deposit Module

Responsible for:

FD creation
Principal amount
Tenure
Interest calculation
Maturity amount
FD closure
Admin Module

Responsible for:

Admin authentication
Admin dashboard
Loan application management
Loan approval
Loan rejection




💰 Banking Operations
Deposit Flow
Customer
   ↓
Enter Account Number
   ↓
Enter Deposit Amount
   ↓
Validate Account
   ↓
Increase Account Balance
   ↓
Record Transaction
   ↓
Refresh Account Data
   ↓
Dashboard Shows Updated Balance
Withdrawal Flow
Customer
   ↓
Enter Withdrawal Amount
   ↓
Check Account Balance
   ↓
Sufficient Balance?
   │
   ├── No → Insufficient Balance
   │
   └── Yes
          ↓
     Deduct Amount
          ↓
     Record Transaction
          ↓
     Refresh Account Data
Fund Transfer Flow
Sender Account
      ↓
Validate Receiver
      ↓
Check Sender Balance
      ↓
Deduct Amount From Sender
      ↓
Add Amount To Receiver
      ↓
Create Transaction




🏦 Loan Management

The loan system follows an administrator approval workflow.

Customer
   ↓
Apply For Loan
   ↓
Loan Status = PENDING
   ↓
Admin Reviews Application
   │
   ├───────────────┐
   │               │
   ▼               ▼
Approve          Reject
   │               │
   ▼               ▼
APPROVED        REJECTED
   │
   ▼
Loan Amount Added
To Customer Account
   │
   ▼
Customer Pays EMI
   │
   ▼
Remaining Amount Updated
   │
   ▼
Loan Fully Paid
   │
   ▼
CLOSED




👔 Employment Information

Customers provide employment information while applying for a loan.

The loan application includes:

Occupation
Monthly Income
Employer Name
Experience in Years

Administrators can review these details before approving or rejecting a loan.




💳 Loan Types

FinFlow currently supports:

HOME
PERSONAL
VEHICLE
EDUCATION
GOLD

Current interest rates:

HOME        → 8.5%
PERSONAL    → 12.0%
VEHICLE     → 9.0%
EDUCATION   → 7.0%
GOLD        → 10.0%

The system calculates:

Total interest
Total payable amount
EMI
Remaining loan amount




📊 Transaction History

The transaction module records banking activities performed by customers.

Transaction information includes:

Transaction ID
Transaction Type
Amount
Balance After Transaction
Transaction Status
Remarks
Transaction Date

Supported transaction types:

DEPOSIT
WITHDRAW
TRANSFER




🗄️ Database

FinFlow uses MySQL as its relational database.

Major entities include:

Customers
Accounts
Transactions
Loans
Fixed Deposits
Admins
Branches

Entity relationships are managed using JPA and Hibernate.

Example:

Customer
   │
   └── Account
          │
          ├── Transactions
          ├── Loans
          └── Fixed Deposits




🔗 REST API Modules

The backend is organized into REST API modules.

/api/customers
/api/accounts
/api/transactions
/api/loans
/api/admin

The APIs are consumed by the React frontend using Axios.




⚙️ Backend Setup
1. Clone the Repository
git clone <your-github-repository-url>
cd FinFlow

2. Create MySQL Database
Open MySQL Workbench or MySQL CLI:
CREATE DATABASE bankingsystem;

3. Configure Database

Open:

backend/src/main/resources/application.properties

Configure your local database:

spring.application.name=bank

spring.datasource.url=jdbc:mysql://localhost:3306/bankingsystem
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080

Do not upload your actual database password to GitHub.

4. Start Backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080




🎨 Frontend Setup

Open a new terminal:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend normally runs on:

http://localhost:5173




🔄 Application Flow
                    FinFlow
                       │
             ┌─────────┴─────────┐
             │                   │
        Customer Login       Admin Login
             │                   │
             ▼                   ▼
     Customer Dashboard    Admin Dashboard
             │                   │
     ┌───────┼────────┐          │
     │       │        │          ▼
  Account  Loans   Transactions  Loan
     │                         Management
     ├── Deposit
     ├── Withdraw
     ├── Transfer
     └── Fixed Deposit




🧪 Testing

The backend APIs can be tested using Thunder Client.

Important scenarios include:

Account
Create account
Get account details
Invalid account
Deposit
Valid deposit
Invalid account
Invalid amount
Withdrawal
Valid withdrawal
Insufficient balance
Invalid account
Transfer
Valid transfer
Insufficient balance
Invalid receiver
Same sender and receiver
Loan
Apply for loan
View loan
Approve loan
Reject loan
Pay EMI
Insufficient balance for EMI
Fixed Deposit
Create FD
View FD
Close FD




📌 Key Highlights
Full-stack digital banking application
Separate Customer and Admin portals
Role-based login flow
RESTful Spring Boot backend
React.js frontend
MySQL database integration
Account management
Deposit and withdrawal
Fund transfers
Transaction history
Loan application workflow
Admin loan approval and rejection
Employment-based loan information
EMI calculation and payment
Fixed deposit management
Account balance synchronization
Centralized exception handling
Responsive user interface




🔮 Future Enhancements
JWT-based authentication
Spring Security
BCrypt password encryption
OTP-based authentication
Email notifications
SMS notifications
Credit score integration
Advanced admin analytics
Loan eligibility prediction
PDF bank statements
Automated EMI reminders
Online KYC verification
Payment gateway integration
Docker deployment
Cloud deployment
Automated testing




👨‍💻 Author

Om S. Kapse

BE Computer Engineering

GitHub: https://github.com/Omkapse23

LinkedIn: https://www.linkedin.com/in/omskapse
