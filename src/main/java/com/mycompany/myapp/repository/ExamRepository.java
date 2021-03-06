package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Exam;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Exam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    @Query("select exam from Exam exam where exam.user.login = ?#{principal.username}")
    List<Exam> findByUserIsCurrentUser();

    Exam findTop1ByUserLoginAndScoreIsNullOrderByCreatedDesc(String login);

    @Query("select count(exam) from Exam exam where exam.score is null and exam.user.login = ?#{principal.username}")
    long countByUserIsCurrentUserAndScoreIsNull();

}
