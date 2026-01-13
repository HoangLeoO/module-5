package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "customer_type_id", nullable = false)
    private CustomerType customerType;

    @NotBlank(message = "Tên không được để trống")
    @Pattern(regexp = "^([A-Z][a-z]*(\\s[A-Z][a-z]*)*)$", message = "Tên phải viết hoa chữ cái đầu của mỗi từ")
    private String name;

    @NotBlank(message = "Ngày sinh không được để trống")
    private String dob;

    @NotNull(message = "Giới tính không được để trống")
    private Integer gender;

    @NotBlank(message = "Số CMND không được để trống")
    @Pattern(regexp = "^(\\d{9}|\\d{12})$", message = "Số CMND phải có 9 hoặc 12 số")
    private String idCard;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)\\d{7}$", message = "Số điện thoại không đúng định dạng")
    private String phone;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    private String address;
}
