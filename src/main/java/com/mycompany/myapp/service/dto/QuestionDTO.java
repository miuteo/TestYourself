package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Answer;
import com.mycompany.myapp.domain.Chapter;
import com.mycompany.myapp.domain.Question;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class QuestionDTO {

    private Long id;
    private String content;
    private Chapter chapter;
    private List<AnswerDTO> answerList;

    public QuestionDTO(Question question){
        this.id = question.getId();
        this.content = question.getContent();
        this.chapter = this.getChapter();
        answerList = question.getAnswerList().stream()
            .map(AnswerDTO::new)
            .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public Chapter getChapter() {
        return chapter;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }
    public List<AnswerDTO> getAnswerList() {
        return answerList;
    }

    public void setAnswerList(List<AnswerDTO> answerList) {
        this.answerList = answerList;
    }


    @Override
    public String toString() {
        return "QuestionDTO{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            "}";
    }
}
