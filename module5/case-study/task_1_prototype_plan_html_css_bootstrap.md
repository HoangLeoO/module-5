# Task 1 – Prototype (HTML/CSS/Bootstrap)

## 1. Mục tiêu Task 1

Task 1 nhằm **xây dựng prototype giao diện tĩnh** cho hệ thống quản lý khu nghỉ dưỡng Furama, **chưa sử dụng React**.

Mục tiêu cốt lõi:
- Hiểu rõ **nghiệp vụ hệ thống** trước khi code React
- Xây dựng layout chuẩn, dễ chuyển sang Component sau này
- Làm quen với Bootstrap, modal, pagination, form CRUD

---

## 2. Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript (cơ bản)
- Bootstrap 5

> Không dùng React, không dùng API, dữ liệu **hard-code**

---

## 3. Cấu trúc thư mục đề xuất

```text
furama-prototype/
│
├── index.html              # Trang chủ / danh sách dịch vụ
├── customer.html           # Danh sách khách hàng
├── contract.html           # Danh sách hợp đồng
│
├── facility-add.html       # Thêm mới dịch vụ
├── facility-edit.html      # Sửa dịch vụ
│
├── customer-add.html       # Thêm khách hàng
├── customer-edit.html      # Sửa khách hàng
│
├── contract-add.html       # Tạo hợp đồng
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│
└── partials/
    ├── header.html
    ├── footer.html
    └── navbar.html
```

---

## 4. Layout chung (BẮT BUỘC)

Tất cả các trang phải có cấu trúc thống nhất:

- Header: logo, tên hệ thống
- Navigation: menu điều hướng
- Main Content: nội dung chính từng trang
- Footer: thông tin bản quyền

```html
<header></header>
<nav></nav>
<main class="container my-4"></main>
<footer></footer>
```

> Layout này sẽ được **chuyển 1-1 sang React Component** ở Task 2

---

## 5. Các màn hình cần thực hiện

### 5.1 Danh sách dịch vụ (Facility ListFacility)

- Hiển thị dạng **Bootstrap Card**
- Mỗi card gồm:
  - Tên dịch vụ
  - Loại dịch vụ (Villa / House / Room)
  - Diện tích
  - Chi phí thuê

- Mỗi card có 2 nút:
  - **Edit** → điều hướng sang trang sửa
  - **Delete** → mở modal xác nhận xóa

- Có **pagination (giả lập)**

---

### 5.2 Modal xác nhận xóa

- Dùng Bootstrap Modal
- Nội dung:
  - Câu hỏi xác nhận xóa
  - Nút Yes / No

> Chưa cần xử lý logic xóa, chỉ cần UI

---

### 5.3 Thêm mới dịch vụ

Form gồm các trường:
- Tên dịch vụ
- Diện tích sử dụng
- Chi phí thuê
- Số người tối đa
- Kiểu thuê

Tùy loại dịch vụ:
- Villa: diện tích hồ bơi, số tầng, tiêu chuẩn phòng
- House: số tầng, tiêu chuẩn phòng
- Room: dịch vụ miễn phí

---

### 5.4 Sửa thông tin dịch vụ

- Giao diện giống **thêm mới**
- Dữ liệu được **hard-code sẵn**

---

### 5.5 Danh sách khách hàng

- Hiển thị dạng **Bootstrap Table**
- Các cột:
  - Họ tên
  - Ngày sinh
  - Giới tính
  - SĐT
  - Loại khách

- Mỗi dòng có:
  - Edit
  - Delete (modal xác nhận)

- Có phân trang

---

### 5.6 Thêm / Sửa khách hàng

Form gồm:
- Họ tên
- Ngày sinh
- Giới tính
- CMND
- SĐT
- Email
- Địa chỉ
- Loại khách

---

### 5.7 Tạo hợp đồng

Form gồm:
- Số hợp đồng
- Khách hàng
- Dịch vụ
- Ngày bắt đầu
- Ngày kết thúc
- Tiền đặt cọc

---

### 5.8 Danh sách hợp đồng

- Hiển thị dạng bảng
- Không cần Edit / Delete
- Có phân trang

---

## 6. Checklist hoàn thành Task 1

- [ ] Header + Footer dùng chung
- [ ] Navigation điều hướng được các trang
- [ ] Danh sách dịch vụ dạng card
- [ ] Modal xác nhận xóa
- [ ] CRUD giao diện dịch vụ (UI)
- [ ] CRUD giao diện khách hàng (UI)
- [ ] Tạo & danh sách hợp đồng
- [ ] Layout thống nhất, Bootstrap chuẩn

---

## 7. Lưu ý quan trọng (định hướng React)

- Không viết CSS quá chi tiết
- Ưu tiên class Bootstrap
- Mỗi màn hình = 1 page → sau này = 1 Component
- Đặt tên class, id **có ý nghĩa**

---

## 8. Kết quả mong đợi

Sau Task 1, bạn phải:
- Hiểu toàn bộ nghiệp vụ hệ thống Furama
- Có prototype hoàn chỉnh
- Sẵn sàng chuyển sang React mà **không cần thiết kế lại**

---

> Task 1 làm kỹ → Task 2,3,4 nhẹ hơn rất nhiều.
