package com.lance.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lance.jpa.domain.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}
