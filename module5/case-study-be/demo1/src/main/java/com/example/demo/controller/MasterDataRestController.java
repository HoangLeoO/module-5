package com.example.demo.controller;

import com.example.demo.entity.Division;
import com.example.demo.entity.EducationDegree;
import com.example.demo.entity.Position;
import com.example.demo.service.MasterDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/master-data")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MasterDataRestController {
    private final MasterDataService masterDataService;

    @GetMapping("/positions")
    public ResponseEntity<List<Position>> getPositions() {
        List<Position> positions = masterDataService.findAllPositions();
        if (positions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(positions, HttpStatus.OK);
    }

    @GetMapping("/education-degrees")
    public ResponseEntity<List<EducationDegree>> getEducationDegrees() {
        List<EducationDegree> degrees = masterDataService.findAllEducationDegrees();
        if (degrees.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(degrees, HttpStatus.OK);
    }

    @GetMapping("/divisions")
    public ResponseEntity<List<Division>> getDivisions() {
        List<Division> divisions = masterDataService.findAllDivisions();
        if (divisions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(divisions, HttpStatus.OK);
    }
}
