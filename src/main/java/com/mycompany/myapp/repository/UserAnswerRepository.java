package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserAnswer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

}
