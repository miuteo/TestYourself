package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserAnswer.
 */
@Entity
@Table(name = "user_answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Question question;

    @OneToMany(mappedBy = "userAnswer")
//    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserVariant> userVariants = new HashSet<>();

    @ManyToOne
    @JsonIgnore
    private Exam exam;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Question getQuestion() {
        return question;
    }

    public UserAnswer question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Set<UserVariant> getUserVariants() {
        return userVariants;
    }

    public UserAnswer userVariants(Set<UserVariant> userVariants) {
        this.userVariants = userVariants;
        return this;
    }

    public UserAnswer addUserVariant(UserVariant userVariant) {
        this.userVariants.add(userVariant);
//        userVariant.setUserAnswer(this);
        return this;
    }

    public UserAnswer removeUserVariant(UserVariant userVariant) {
        this.userVariants.remove(userVariant);
//        userVariant.setUserAnswer(null);
        return this;
    }

    public void setUserVariants(Set<UserVariant> userVariants) {
        this.userVariants = userVariants;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserAnswer userAnswer = (UserAnswer) o;
        if (userAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAnswer{" +
            "id=" + getId() +
            "}";
    }
}
