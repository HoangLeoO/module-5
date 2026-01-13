package com.example.demo.service;

import com.example.demo.entity.Position;
import com.example.demo.entity.EducationDegree;
import com.example.demo.entity.Division;
import com.example.demo.repository.IPositionRepository;
import com.example.demo.repository.IEducationDegreeRepository;
import com.example.demo.repository.IDivisionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MasterDataService {
    private final IPositionRepository positionRepository;
    private final IEducationDegreeRepository educationDegreeRepository;
    private final IDivisionRepository divisionRepository;

    public List<Position> findAllPositions() {
        return positionRepository.findAll();
    }

    public List<EducationDegree> findAllEducationDegrees() {
        return educationDegreeRepository.findAll();
    }

    public List<Division> findAllDivisions() {
        return divisionRepository.findAll();
    }
}
