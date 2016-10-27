package com.lance.jpa.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.lance.jpa.domain.Teacher;
import com.lance.jpa.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService {
	@Autowired
	private TeacherRepository teacherRepository;
	
	@Override
	public List<Teacher> findAll() {
		return teacherRepository.findAll();
	}

	@Override
	public List<Teacher> findAll(Sort sort) {
		return teacherRepository.findAll(sort);
	}

	@Override
	public List<Teacher> findAll(Iterable<Integer> ids) {
		return teacherRepository.findAll(ids);
	}

	@Override
	@Transactional
	public Teacher saveAndFlush(Teacher teacher) {
		return teacherRepository.saveAndFlush(teacher);
	}

	@Override
	public void deleteInBatch(Iterable<Teacher> entities) {
		teacherRepository.deleteInBatch(entities);
	}

	@Override
	public void deleteAllInBatch() {
		teacherRepository.deleteAllInBatch();
	}

	@Override
	public Teacher getOne(Integer id) {
		return teacherRepository.getOne(id);
	}

	@Override
	public List<Teacher> findByName(String name) {
		return teacherRepository.findByName(name);
	}

	@Override
	public void delete(Integer id) {
		teacherRepository.delete(id);
	}
}