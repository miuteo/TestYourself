package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Answer;

import com.mycompany.myapp.repository.AnswerRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Answer.
 */
@RestController
@RequestMapping("/api")
public class AnswerResource {

    private final Logger log = LoggerFactory.getLogger(AnswerResource.class);

    private static final String ENTITY_NAME = "answer";

    private final AnswerRepository answerRepository;

    public AnswerResource(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    /**
     * POST  /answers : Create a new answer.
     *
     * @param answer the answer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new answer, or with status 400 (Bad Request) if the answer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/answers")
    @Timed
    public ResponseEntity<Answer> createAnswer(@Valid @RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to save Answer : {}", answer);
        if (answer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new answer cannot already have an ID")).body(null);
        }
        Answer result = answerRepository.save(answer);
        return ResponseEntity.created(new URI("/api/answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /answers : Updates an existing answer.
     *
     * @param answer the answer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated answer,
     * or with status 400 (Bad Request) if the answer is not valid,
     * or with status 500 (Internal Server Error) if the answer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/answers")
    @Timed
    public ResponseEntity<Answer> updateAnswer(@Valid @RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to update Answer : {}", answer);
        if (answer.getId() == null) {
            return createAnswer(answer);
        }
        Answer result = answerRepository.save(answer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, answer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /answers : get all the answers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of answers in body
     */
    @GetMapping("/answers")
    @Timed
    public ResponseEntity<List<Answer>> getAllAnswers(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Answers");
        Page<Answer> page = answerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/answers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/answers/answersByQuestionID/{questionID}")
    @Timed
    public ResponseEntity<List<Answer>> getAllAnswersByQuestionID(@PathVariable long questionID) {
        log.debug("REST request to get a page of Answers");
        List<Answer> answers = answerRepository.findByQuestionId(questionID);
        return ResponseEntity.ok()
        .body(answers.stream().map(x->{
                x.setIsCorect(true);
                return x;
            }
            ).collect(Collectors.toList()));
    }


    /**
     * GET  /answers/:id : get the "id" answer.
     *
     * @param id the id of the answer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the answer, or with status 404 (Not Found)
     */
    @GetMapping("/answers/{id}")
    @Timed
    public ResponseEntity<Answer> getAnswer(@PathVariable Long id) {
        log.debug("REST request to get Answer : {}", id);
        Answer answer = answerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(answer));
    }

    /**
     * DELETE  /answers/:id : delete the "id" answer.
     *
     * @param id the id of the answer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/answers/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        log.debug("REST request to delete Answer : {}", id);
        answerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
