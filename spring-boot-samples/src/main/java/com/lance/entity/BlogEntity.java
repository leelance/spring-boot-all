package com.lance.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="blog")
public class BlogEntity extends BaseEntity {
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserEntity blongUser;
	
	private String title;
	private String description;
	private String summary;
	private String tags;
	
	@Lob
	private String content;

	public UserEntity getBlongUser() {
		return blongUser;
	}

	public void setBlongUser(UserEntity blongUser) {
		this.blongUser = blongUser;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
