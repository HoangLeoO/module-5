package com.example.demo.service;

import com.example.demo.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface IEmployeeService {
    Page<Employee> findAll(Pageable pageable);
    Optional<Employee> findById(Integer id);
    void save(Employee employee);
    void deleteById(Integer id);
}
