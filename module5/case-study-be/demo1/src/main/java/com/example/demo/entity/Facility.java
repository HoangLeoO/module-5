package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "facility")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Facility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Tên dịch vụ không được để trống")
    @Pattern(regexp = "^([A-Z][a-z0-9]*(\\s[A-Z][a-z0-9]*)*)$", message = "Tên dịch vụ phải viết hoa chữ cái đầu và không chứa ký tự đặc biệt")
    private String name;

    @NotNull(message = "Diện tích không được để trống")
    @Min(value = 1, message = "Diện tích phải là số dương")
    private Integer area;

    @NotNull(message = "Chi phí không được để trống")
    @Min(value = 0, message = "Chi phí phải là số dương")
    private Double cost;

    @NotNull(message = "Số người tối đa không được để trống")
    @Min(value = 1, message = "Số người tối đa phải là số dương")
    private Integer maxPeople;

    @ManyToOne
    @JoinColumn(name = "rent_type_id", nullable = false)
    private RentType rentType;

    @ManyToOne
    @JoinColumn(name = "facility_type_id", nullable = false)
    private FacilityType facilityType;

    private String roomStandard;
    private String otherConvenience;
    private Double poolArea;
    private Integer floors;
    private String freeService;
}
