-- Insert dữ liệu cho bảng position
use `case-study-be`;


INSERT INTO `position` (name) VALUES ('Lễ tân');
INSERT INTO `position` (name) VALUES ('Phục vụ');
INSERT INTO `position` (name) VALUES ('Chuyên viên');
INSERT INTO `position` (name) VALUES ('Giám sát');
INSERT INTO `position` (name) VALUES ('Quản lý');
INSERT INTO `position` (name) VALUES ('Giám đốc');

-- Insert dữ liệu cho bảng education_degree
INSERT INTO education_degree (name) VALUES ('Trung cấp');
INSERT INTO education_degree (name) VALUES ('Cao đẳng');
INSERT INTO education_degree (name) VALUES ('Đại học');
INSERT INTO education_degree (name) VALUES ('Sau đại học');

-- Insert dữ liệu cho bảng division
INSERT INTO division (name) VALUES ('Sale-Marketing');
INSERT INTO division (name) VALUES ('Hành chính');
INSERT INTO division (name) VALUES ('Phục vụ');
INSERT INTO division (name) VALUES ('Quản lý');

-- Insert dữ liệu mẫu cho bảng employee
INSERT INTO employee (name, dob, id_card, salary, phone, email, address, position_id, education_degree_id, division_id) 
VALUES ('Nguyễn Văn An', '1990-10-10', '123456789', 10000000, '0901234567', 'an.nguyen@example.com', 'Đà Nẵng', 1, 3, 1);

INSERT INTO employee (name, dob, id_card, salary, phone, email, address, position_id, education_degree_id, division_id) 
VALUES ('Lê Thị Bình', '1985-05-15', '987654321', 15000000, '0917654321', 'binh.le@example.com', 'Quảng Nam', 2, 2, 3);

INSERT INTO employee (name, dob, id_card, salary, phone, email, address, position_id, education_degree_id, division_id) 
VALUES ('Trần Hoàng Gia', '1995-12-25', '456789123', 12000000, '0901112223', 'gia.tran@example.com', 'Huế', 3, 3, 2);

INSERT INTO employee (name, dob, id_card, salary, phone, email, address, position_id, education_degree_id, division_id) 
VALUES ('Phạm Minh Đức', '1992-03-20', '321654987', 20000000, '0919998887', 'duc.pham@example.com', 'Đà Nẵng', 5, 4, 4);

INSERT INTO employee (name, dob, id_card, salary, phone, email, address, position_id, education_degree_id, division_id) 
VALUES ('Hoàng Kim Liên', '1988-07-07', '159357486', 18000000, '0905554443', 'lien.hoang@example.com', 'Quảng Ngãi', 4, 3, 1);
