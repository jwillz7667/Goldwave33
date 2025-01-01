# Database Guidelines

This document outlines the recommended database schema for the premiere online casino web application. The schema focuses on scalability, security, and auditability. Use these guidelines as a starting point and adjust based on specific business or regulatory requirements.

---

## 1. Users Table

Stores basic user information, including login credentials, personal details, and user status.

| Column           | Data Type     | Constraints                                   | Description                                                    |
|------------------|---------------|-----------------------------------------------|----------------------------------------------------------------|
| id               | SERIAL (PK)   | PRIMARY KEY, Auto-increment                   | Unique identifier for each user                                |
| email            | VARCHAR(255)  | UNIQUE, NOT NULL                              | User’s email address (used to log in)                          |
| username         | VARCHAR(100)  | UNIQUE, NOT NULL                              | Display name or nickname chosen by user                        |
| password_hash    | VARCHAR(255)  | NOT NULL                                      | Hashed user password (bcrypt preferred)                        |
| first_name       | VARCHAR(100)  | NULLABLE                                      | User’s first name                                             |
| last_name        | VARCHAR(100)  | NULLABLE                                      | User’s last name                                              |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP                     | Timestamp of creation                                          |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update                              |
| status           | VARCHAR(50)   | DEFAULT 'active'                              | Possible values: 'active', 'suspended', 'closed', etc.         |

• Indexes:  
  - A unique index on (email)  
  - A unique index on (username)

---

## 2. User Profiles / Details (Optional)

If the application requires more detailed user information or KYC (Know Your Customer) data, use a separate table to keep the data organized and maintain privacy.

| Column         | Data Type    | Constraints               | Description                                                                       |
|----------------|--------------|---------------------------|-----------------------------------------------------------------------------------|
| user_id        | INT (FK)     | REFERENCES users(id)      | Links to the user                                                                 |
| address_line_1 | VARCHAR(255) | NULLABLE                  | User’s address                                                                    |
| address_line_2 | VARCHAR(255) | NULLABLE                  | Additional address info                                                           |
| city           | VARCHAR(100) | NULLABLE                  | City of residence                                                                 |
| state          | VARCHAR(100) | NULLABLE                  | State or region                                                                   |
| country        | VARCHAR(100) | NULLABLE                  | User’s country                                                                    |
| zip_code       | VARCHAR(20)  | NULLABLE                  | Postal code                                                                       |
| phone_number   | VARCHAR(20)  | NULLABLE                  | User’s phone number                                                               |
| dob            | DATE         | NULLABLE                  | Date of birth (for age verification)                                             |
| kyc_status     | VARCHAR(50)  | DEFAULT 'pending'         | KYC verification status: 'pending', 'verified', 'rejected'                       |

---

## 3. Balances (If Not Stored in Users Table)

A separate table to store financial balances if you prefer not to store them in `users`, or if you anticipate multiple balance “wallets” (e.g., real money, bonus money, loyalty points, etc.).

| Column             | Data Type   | Constraints              | Description                                            |
|--------------------|------------|--------------------------|--------------------------------------------------------|
| id                 | SERIAL (PK) | PRIMARY KEY              | Unique identifier for each balance entry               |
| user_id            | INT (FK)    | REFERENCES users(id)     | Links to the user owning the balance                   |
| balance_type       | VARCHAR(50) | DEFAULT 'cash'           | E.g., 'cash', 'bonus', 'loyalty'                       |
| amount             | NUMERIC(10,2)| DEFAULT 0.0             | Current balance amount                                 |
| updated_at         | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last updated time |

---

## 4. Transactions Table

Logs all financial transactions such as deposits, withdrawals, or transfers between balances.

| Column         | Data Type     | Constraints                                              | Description                                                     |
|----------------|---------------|----------------------------------------------------------|-----------------------------------------------------------------|
| id             | SERIAL (PK)   | PRIMARY KEY                                              | Unique identifier for each transaction                          |
| user_id        | INT (FK)      | REFERENCES users(id)                                     | Links to the user making transaction                            |
| transaction_type | VARCHAR(50) | NOT NULL                                                 | Types might be: 'deposit', 'withdrawal', 'bonus', 'bet', 'win'  |
| amount         | NUMERIC(10,2) | NOT NULL                                                 | Transaction amount                                              |
| balance_before | NUMERIC(10,2) | NOT NULL                                                 | Balance before the transaction                                  |
| balance_after  | NUMERIC(10,2) | NOT NULL                                                 | Balance after the transaction                                   |
| reference_id   | VARCHAR(255)  | NULLABLE                                                 | External gateway reference or system reference for the transaction |
| created_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP                                | Timestamp of the transaction                                    |

• Indexes:  
  - Consider indexing user_id, transaction_type, or created_at for faster lookups and reporting.  
  - This table is key for auditing and compliance.

---

## 5. Games Table

Stores basic information about each game type or individual game offered (slots, table games, poker, etc.).

| Column         | Data Type     | Constraints               | Description                                                            |
|----------------|---------------|---------------------------|------------------------------------------------------------------------|
| id             | SERIAL (PK)   | PRIMARY KEY               | Unique identifier for each game                                        |
| name           | VARCHAR(100)  | NOT NULL                  | Name of the game                                                       |
| category       | VARCHAR(50)   | NOT NULL                  | E.g., 'slots', 'table', 'live dealer', etc.                            |
| description    | TEXT          | NULLABLE                  | Description or rules of the game                                       |
| rtp            | NUMERIC(5,2)  | NULLABLE                  | Return to Player percentage (used in slots or certain table games)      |
| status         | VARCHAR(50)   | DEFAULT 'active'          | 'active' or 'disabled' for game availability                           |
| created_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | When the game was added                                                |
| updated_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | When the game was last updated                             |

---

## 6. Bets Table (or Game Results)

Tracks bets or rounds played by users in each game. Useful for audit logs, analytics, and regulatory requirements.

| Column        | Data Type     | Constraints              | Description                                                         |
|---------------|---------------|--------------------------|---------------------------------------------------------------------|
| id            | SERIAL (PK)   | PRIMARY KEY              | Unique identifier for each bet/round                                |
| user_id       | INT (FK)      | REFERENCES users(id)     | The user placing the bet                                            |
| game_id       | INT (FK)      | REFERENCES games(id)     | Specific game associated with the bet/round                         |
| amount        | NUMERIC(10,2) | NOT NULL                 | Amount of the bet                                                   |
| outcome       | VARCHAR(50)   | NULLABLE                 | E.g., 'win', 'lose', 'push'                                         |
| payout        | NUMERIC(10,2) | DEFAULT 0.0              | The amount won or lost (negative values if losing is tracked here)  |
| bet_time      | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp when the bet/round occurred                               |

---

## 7. Promotions Table

Holds information on promotional offers, including bonus amounts and eligibility rules.

| Column          | Data Type     | Constraints                                  | Description                                                      |
|-----------------|---------------|----------------------------------------------|------------------------------------------------------------------|
| id              | SERIAL (PK)   | PRIMARY KEY                                  | Unique identifier for the promotion                              |
| title           | VARCHAR(255)  | NOT NULL                                     | Name of the promotion, e.g., 'Welcome Bonus'                     |
| description     | TEXT          | NULLABLE                                     | Details about the promotion                                      |
| promo_code      | VARCHAR(100)  | UNIQUE, NULLABLE                             | Optional code the user must enter to claim                       |
| bonus_amount    | NUMERIC(10,2) | DEFAULT 0.0                                  | Monetary bonus or free spin equivalent                           |
| start_date      | DATE          | NULLABLE                                     | Date when the promotion starts                                   |
| end_date        | DATE          | NULLABLE                                     | Date when the promotion ends                                     |
| is_active       | BOOLEAN       | DEFAULT FALSE                                | If this promotion is currently active                            |
| created_at      | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP                    | Creation date                                                    |

---

## 8. Promotion Claims Table

Logs when a user claims or redeems a promotion. Prevents multiple uses of the same promo if that rule applies.

| Column         | Data Type    | Constraints             | Description                                     |
|----------------|-------------|-------------------------|-------------------------------------------------|
| id             | SERIAL (PK) | PRIMARY KEY             | Unique identifier for each claim               |
| user_id        | INT (FK)    | REFERENCES users(id)    | User who claimed the promotion                  |
| promotion_id   | INT (FK)    | REFERENCES promotions(id) | The promotion being claimed                  |
| claim_time     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP | Timestamp of the claim                         |
| status         | VARCHAR(50) | DEFAULT 'claimed'       | Track redemption status: 'claimed', 'applied', 'expired' |

---

## 9. Payment Methods Table (Optional)

If the system needs to maintain stored payment methods (credit cards, PayPal, etc.) for convenient deposits and withdrawals. Strictly follow security guidelines (PCI DSS) if storing any sensitive payment information.

| Column            | Data Type     | Constraints                        | Description                             |
|-------------------|---------------|------------------------------------|-----------------------------------------|
| id                | SERIAL (PK)   | PRIMARY KEY                        | Unique identifier for the payment method|
| user_id           | INT (FK)      | REFERENCES users(id)               | Owner of the payment method             |
| payment_type      | VARCHAR(50)   | NOT NULL                           | E.g., 'credit_card', 'paypal', 'crypto' |
| last_four_digits  | VARCHAR(4)    | NULLABLE                           | Masked digits for identification        |
| provider_token    | VARCHAR(255)  | NULLABLE                           | Token from payment gateway              |
| created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP          | Timestamp when the method was added     |
| updated_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last update         |

---

## 10. Audit Logs Table (Recommended)

Captures critical system events such as password changes, account suspensions, admin actions, and more. Helpful for security audits and regulatory compliance.

| Column       | Data Type     | Constraints               | Description                                                       |
|--------------|--------------|---------------------------|-------------------------------------------------------------------|
| id           | SERIAL (PK)   | PRIMARY KEY               | Unique identifier for the audit record                            |
| user_id      | INT (FK)      | REFERENCES users(id)      | User performing the action (or affected by the action)            |
| action       | VARCHAR(255)  | NOT NULL                  | Description of the event (e.g., 'ACCOUNT_SUSPENDED', 'PASSWORD_RESET') |
| details      | TEXT          | NULLABLE                  | Additional info about the event                                   |
| created_at   | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp when the event occurred                                 |

---

## 11. Additional Considerations

1. **Indices**: Add indexes on frequently queried fields like `user_id`, `created_at`, or `promo_code` to enhance performance.  
2. **Constraints & Triggers**:  
   - Use foreign key constraints to maintain referential integrity.  
   - Consider triggers or stored procedures for complex, cross-table updates (e.g., when a bet is placed, adjust balances and log the transaction).  
3. **Partitioning / Archival**: High-traffic tables like `bets` or `transactions` may rapidly grow. Implement partitioning or design an archival strategy to keep performance high.  
4. **Views & Reporting Tables**: Create read-only views or specialized reporting tables for analytics (daily bet totals, monthly deposit volume, etc.).  
5. **Regulatory & Backup Requirements**: Comply with local laws, especially regarding data retention, age verification logs, KYC, and anti-money laundering (AML). Regularly back up the entire database.

---

## Conclusion

This schema offers a foundation for handling users, balances, transactions, games, bets, and promotions effectively. Always adapt these guidelines based on the specific scale and regulatory environment of your online casino. As your system evolves, continually review and optimize table structures, indexes, and relationships to maintain security, performance, and data integrity.