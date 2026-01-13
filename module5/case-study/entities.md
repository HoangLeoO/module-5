# Entity Documentation for Backend Migration

This document outlines the data structures used in the Furama Resort Case Study, intended for conversion into backend entities (e.g., Spring Boot/JPA).

## 1. Customer Management

### `CustomerType`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Diamond, Platinum, Gold, Silver, Member)

### `Customer`
- `id`: Integer (Primary Key)
- `customerTypeId`: Integer (Foreign Key to `CustomerType`)
- `name`: String
    - *Constraint:* Capitalize first letter of each word.
- `dob`: Date (YYYY-MM-DD)
    - *Constraint:* Age must be 18 or older.
- `gender`: Integer (1: Male, 0: Female)
- `idCard`: String
    - *Constraint:* 9 or 12 digits.
- `phone`: String
    - *Constraint:* Format `090xxxxxxx`, `091xxxxxxx`, `(84)+90xxxxxxx`, or `(84)+91xxxxxxx`.
- `email`: String (Email format)
- `address`: String

---

## 2. Employee Management

### `Position`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Quản lý, Nhân viên)

### `EducationDegree`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Trung cấp, Cao đẳng, Đại học, Sau đại học)

### `Division`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Sale-Marketing, Hành chính, Phục vụ, Quản lý)

### `Employee`
- `id`: Integer (Primary Key)
- `name`: String
- `dob`: Date (YYYY-MM-DD)
- `idCard`: String
- `salary`: Double/Decimal
- `phone`: String
- `email`: String
- `address`: String
- `positionId`: Integer (Foreign Key to `Position`)
- `educationDegreeId`: Integer (Foreign Key to `EducationDegree`)
- `divisionId`: Integer (Foreign Key to `Division`)

---

## 3. Facility Management

### `FacilityType`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Villa, House, Room)

### `RentType`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Năm, Tháng, Ngày, Giờ)

### `Facility`
- `id`: Integer (Primary Key)
- `name`: String
    - *Constraint:* Capitalize first letter, no numbers.
- `area`: Integer (Positive)
- `cost`: Double/Decimal (Positive)
- `maxPeople`: Integer (Positive)
- `rentTypeId`: Integer (Foreign Key to `RentType`)
- `facilityTypeId`: Integer (Foreign Key to `FacilityType`)
- `roomStandard`: String (Required for Villa/House)
- `otherConvenience`: String (Required for Villa/House)
- `poolArea`: Double (Required for Villa)
- `floors`: Integer (Required for Villa/House)
- `freeService`: String (Required for Room)

---

## 4. Contract Management

### `AttachService`
- `id`: Integer (Primary Key)
- `name`: String (e.g., Massage, Karaoke, Thức ăn, Nước uống, Thuê xe)
- `unit`: String
- `cost`: Double/Decimal
- `status`: String

### `Contract`
- `id`: Integer (Primary Key)
- `startDate`: Date
- `endDate`: Date
- `deposit`: Double/Decimal
- `employeeId`: Integer (Foreign Key to `Employee`)
- `customerId`: Integer (Foreign Key to `Customer`)
- `facilityId`: Integer (Foreign Key to `Facility`)

### `ContractDetail` (Optional based on expansion)
- `id`: Integer
- `contractId`: Integer (Foreign Key to `Contract`)
- `attachServiceId`: Integer (Foreign Key to `AttachService`)
- `quantity`: Integer
