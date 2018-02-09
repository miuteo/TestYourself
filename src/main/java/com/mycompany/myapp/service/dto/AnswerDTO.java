package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Answer;
import com.mycompany.myapp.domain.Question;
import com.mycompany.myapp.domain.enumeration.Variant;

import javax.validation.constraints.NotNull;

public class AnswerDTO{

    private Long id;

    private Variant variant;

    private String content;


    public AnswerDTO(Answer answer){
        this.id = answer.getId();
        this.content = answer.getContent();
        this.variant = answer.getVariant();
    }



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





    @Override
    public String toString() {
        return "Answer{" +
            "id=" + getId() +
            ", variant='" + getVariant() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
