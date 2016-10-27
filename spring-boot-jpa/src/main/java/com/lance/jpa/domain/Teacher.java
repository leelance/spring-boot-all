package com.lance.jpa.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name="t_teacher")
public class Teacher implements Serializable {
	private static final long serialVersionUID = 9181998751400657281L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private String name;
	
	private String sex;
	
	@JSONField(format="yyyy-MM-dd")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createTime;
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="t_teacher_student")
	private Set<Student> students = new HashSet<Student>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Set<Student> getStudents() {
		return students;
	}

	public void setStudents(Set<Student> students) {
		this.students = students;
	}

}
