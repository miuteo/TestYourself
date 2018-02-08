package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Question;
import com.mycompany.myapp.domain.enumeration.Variant;

import javax.validation.constraints.NotNull;

public class AnswerDTO{

    private Long id;

    private Variant variant;


    @NotNull
    private String content;

    private Question question;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Variant getVariant() {
        return variant;
    }


    public void setVariant(Variant variant) {
        this.variant = variant;
    }




    public String getContent() {
        return content;
    }


    public void setContent(String content) {
        this.content = content;
    }

    public Question getQuestion() {
        return question;
    }


    public void setQuestion(Question question) {
        this.question = question;
    }


    @Override
    public String toString() {
        return "Answer{" +
            "id=" + getId() +
            ", variant='" + getVariant() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
