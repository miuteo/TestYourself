package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Exam;

import com.mycompany.myapp.domain.Question;
import com.mycompany.myapp.domain.UserAnswer;
import com.mycompany.myapp.repository.*;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.util.RandomUtil;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.core.UriBuilderException;
import java.net.URI;
import java.net.URISyntaxException;

import java.time.Instant;
import java.util.*;

/**
 * REST controller for managing Exam.
 */
@RestController
@RequestMapping("/api")
public class ExamResource {

    private final Logger log = LoggerFactory.getLogger(ExamResource.class);

    private static final String ENTITY_NAME = "exam";

    private final ExamRepository examRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final UserAnswerRepository userAnswerRepository;

    public ExamResource(ExamRepository examRepository,UserRepository userRepository,QuestionRepository questionRepository,UserAnswerRepository userAnswerRepository) {
        this.examRepository = examRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.userAnswerRepository = userAnswerRepository;
    }

    /**
     * POST  /exams : Create a new exam.
     *
     * @param exam the exam to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exam, or with status 400 (Bad Request) if the exam has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exams")
    @Timed
    public ResponseEntity<Exam> createExam(@Valid @RequestBody Exam exam) throws URISyntaxException {
        log.debug("REST request to save Exam : {}", exam);
        if (exam.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new exam cannot already have an ID")).body(null);
        }
        Exam result = examRepository.save(exam);
        return ResponseEntity.created(new URI("/api/exams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    @PostMapping("/newExam")
    @Timed
    public ResponseEntity<Exam> generateExam()throws URISyntaxException{
        log.debug("REST request to generate new exam");
        Exam newExam = new Exam();
        String loginName = SecurityUtils.getCurrentUserLogin();
        newExam.setUser(userRepository.findOneByLogin(loginName).orElse(null));
        Set<Long> chapters = new HashSet<>();
        chapters.add(1L);
        chapters.add(2L);
        chapters.add(3L);
        chapters.add(4L);
        chapters.add(6L);
        chapters.add(7L);

        for(Long chapterID: chapters){
            UserAnswer userAnswer = new UserAnswer();
            List<Question> questions = questionRepository.findByChapterId(chapterID);
            int winnerID = new Random().nextInt(questions.size());
            userAnswer.setQuestion(questions.get(winnerID));
            newExam.addUserAnswer(userAnswer);
        }
        newExam.setCreated(Instant.now());
        Exam result = examRepository.save(newExam);
        userAnswerRepository.save(result.getUserAnswers());
        return ResponseEntity.created(new URI("/api/exams/" + newExam.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME,""
                +result.getId().toString()
            ))
            .body(newExam);
    }


    /**
     * PUT  /exams : Updates an existing exam.
     *
     * @param exam the exam to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exam,
     * or with status 400 (Bad Request) if the exam is not valid,
     * or with status 500 (Internal Server Error) if the exam couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exams")
    @Timed
    public ResponseEntity<Exam> updateExam(@Valid @RequestBody Exam exam) throws URISyntaxException {
        log.debug("REST request to update Exam : {}", exam);
        if (exam.getId() == null) {
            return createExam(exam);
        }
        Exam result = examRepository.save(exam);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exam.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exams : get all the exams.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of exams in body
     */
    @GetMapping("/exams")
    @Timed
    public ResponseEntity<List<Exam>> getAllExams(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Exams");
        Page<Exam> page = examRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/exams");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /exams/:id : get the "id" exam.
     *
     * @param id the id of the exam to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exam, or with status 404 (Not Found)
     */
    @GetMapping("/exams/{id}")
    @Transactional
    @Timed
    public ResponseEntity<Exam> getExam(@PathVariable Long id) {
        log.debug("REST request to get Exam : {}", id);
        Exam exam = examRepository.findOne(id);
        log.debug(exam.getUserAnswers().toString());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exam));
    }
    @GetMapping("/exams/getLastExam")
    @Transactional
    @Timed
    public ResponseEntity<Exam> getExam() {
        log.debug("REST request to get last Exam");
        Exam exam = examRepository.findTop1ByUserLoginAndScoreIsNullOrderByCreatedDesc(SecurityUtils.getCurrentUserLogin());
        if(exam!=null && exam.getUserAnswers()!=null)
            log.debug(exam.getUserAnswers().toString());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exam));
    }

    /**
     * DELETE  /exams/:id : delete the "id" exam.
     *
     * @param id the id of the exam to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exams/{id}")
    @Timed
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        log.debug("REST request to delete Exam : {}", id);
        examRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
