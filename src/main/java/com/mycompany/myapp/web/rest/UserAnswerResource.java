package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.UserAnswer;

import com.mycompany.myapp.repository.UserAnswerRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserAnswer.
 */
@RestController
@RequestMapping("/api")
public class UserAnswerResource {

    private final Logger log = LoggerFactory.getLogger(UserAnswerResource.class);

    private static final String ENTITY_NAME = "userAnswer";

    private final UserAnswerRepository userAnswerRepository;

    public UserAnswerResource(UserAnswerRepository userAnswerRepository) {
        this.userAnswerRepository = userAnswerRepository;
    }

    /**
     * POST  /user-answers : Create a new userAnswer.
     *
     * @param userAnswer the userAnswer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userAnswer, or with status 400 (Bad Request) if the userAnswer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-answers")
    @Timed
    public ResponseEntity<UserAnswer> createUserAnswer(@RequestBody UserAnswer userAnswer) throws URISyntaxException {
        log.debug("REST request to save UserAnswer : {}", userAnswer);
        if (userAnswer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userAnswer cannot already have an ID")).body(null);
        }
        UserAnswer result = userAnswerRepository.save(userAnswer);
        return ResponseEntity.created(new URI("/api/user-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-answers : Updates an existing userAnswer.
     *
     * @param userAnswer the userAnswer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userAnswer,
     * or with status 400 (Bad Request) if the userAnswer is not valid,
     * or with status 500 (Internal Server Error) if the userAnswer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-answers")
    @Timed
    public ResponseEntity<UserAnswer> updateUserAnswer(@RequestBody UserAnswer userAnswer) throws URISyntaxException {
        log.debug("REST request to update UserAnswer : {}", userAnswer);
        if (userAnswer.getId() == null) {
            return createUserAnswer(userAnswer);
        }
        UserAnswer result = userAnswerRepository.save(userAnswer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userAnswer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-answers : get all the userAnswers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userAnswers in body
     */
    @GetMapping("/user-answers")
    @Timed
    public List<UserAnswer> getAllUserAnswers() {
        log.debug("REST request to get all UserAnswers");
        return userAnswerRepository.findAll();
        }

    /**
     * GET  /user-answers/:id : get the "id" userAnswer.
     *
     * @param id the id of the userAnswer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userAnswer, or with status 404 (Not Found)
     */
    @GetMapping("/user-answers/{id}")
    @Timed
    public ResponseEntity<UserAnswer> getUserAnswer(@PathVariable Long id) {
        log.debug("REST request to get UserAnswer : {}", id);
        UserAnswer userAnswer = userAnswerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userAnswer));
    }

    /**
     * DELETE  /user-answers/:id : delete the "id" userAnswer.
     *
     * @param id the id of the userAnswer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-answers/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserAnswer(@PathVariable Long id) {
        log.debug("REST request to delete UserAnswer : {}", id);
        userAnswerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
