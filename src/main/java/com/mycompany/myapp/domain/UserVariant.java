package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.Variant;

/**
 * A UserVariant.
 */
@Entity
@Table(name = "user_variant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserVariant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "variant")
    private Variant variant;

    @ManyToOne
    @JsonIgnore
    private UserAnswer userAnswer;


    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Variant getVariant() {
        return variant;
    }

    public UserVariant variant(Variant variant) {
        this.variant = variant;
        return this;
    }

    public void setVariant(Variant variant) {
        this.variant = variant;
    }

    public UserAnswer getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(UserAnswer userAnswer) {
        this.userAnswer = userAnswer;
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
        UserVariant userVariant = (UserVariant) o;
        if (userVariant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userVariant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserVariant{" +
            "id=" + getId() +
            ", variant='" + getVariant() + "'" +
            "}";
    }
}
