package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.UserAnswer;
import com.mycompany.myapp.domain.UserVariant;
import java.util.HashSet;
import java.util.Set;

public class UserAnswerDTO {
        private Long id;

        private QuestionDTO question;

        private Set<UserVariant> userVariants = new HashSet<>();

        public UserAnswerDTO(UserAnswer userAnswer){
            this.id = userAnswer.getId();
            question = new QuestionDTO(userAnswer.getQuestion());
            userVariants.addAll(userAnswer.getUserVariants());
        }
        public Long getId() {
        return id;
    }

        public void setId(Long id) {
        this.id = id;
    }

        public QuestionDTO getQuestion() {
        return question;
    }

        public Set<UserVariant> getUserVariants() {
        return userVariants;
    }




        public void setUserVariants(Set<UserVariant> userVariants) {
        this.userVariants = userVariants;
    }

        @Override
        public String toString() {
        return "UserAnswerDTO{" +
            "id=" + getId() +
            "}";
    }


}
