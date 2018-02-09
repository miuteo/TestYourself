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
import java.util.stream.Collectors;

public class ExamDTO {

    private Long id;

    private Integer score;

    private Integer totalQuestions;

    private Integer noOfQuestionsAnswered;

    private Integer totalScore;

    private Instant created;

    private Instant lastModifiedDate;

    private Set<UserAnswerDTO> userAnswers;

    public ExamDTO(Exam exam){
        if(exam == null)
            throw new NullPointerException();
        this.id = exam.getId();
        this.score = exam.getScore();

        totalQuestions = exam.getUserAnswers().size();
        userAnswers = exam.getUserAnswers().stream()
            .filter(question -> question.getUserVariants().size()==0)
            .map(UserAnswerDTO::new)
            .collect(Collectors.toSet());
        noOfQuestionsAnswered = totalQuestions - userAnswers.size();
    }

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


    public Set<UserAnswerDTO> getUserAnswers() {
        return userAnswers;
    }


    public void setUserAnswers(Set<UserAnswerDTO> userAnswers) {
        this.userAnswers = userAnswers;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getNoOfQuestionsAnswered() {
        return noOfQuestionsAnswered;
    }

    public void setNoOfQuestionsAnswered(Integer noOfQuestionsAnswered) {
        this.noOfQuestionsAnswered = noOfQuestionsAnswered;
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
