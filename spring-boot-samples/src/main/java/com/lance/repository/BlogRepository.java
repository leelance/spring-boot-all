package com.lance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lance.entity.BlogEntity;

public interface BlogRepository extends JpaRepository<BlogEntity, Long>{

}
