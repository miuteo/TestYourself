package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Exam;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.UserAnswer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class ExamDTO {

    private Long id;

    private Integer score;

    private Integer totalScore;

    private Instant created;

    private Instant lastModifiedDate;

    private User user;

    private Set<UserAnswer> userAnswers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Instant getCreated() {
        return created;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<UserAnswer> getUserAnswers() {
        return userAnswers;
    }


    public void setUserAnswers(Set<UserAnswer> userAnswers) {
        this.userAnswers = userAnswers;
    }


    @Override
    public String toString() {
        return "ExamDTO{" +
            "id=" + getId() +
            ", score='" + getScore() + "'" +
            ", totalScore='" + getTotalScore() + "'" +
            ", created='" + getCreated() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
