package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.UserVariant;

import com.mycompany.myapp.repository.UserVariantRepository;
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
 * REST controller for managing UserVariant.
 */
@RestController
@RequestMapping("/api")
public class UserVariantResource {

    private final Logger log = LoggerFactory.getLogger(UserVariantResource.class);

    private static final String ENTITY_NAME = "userVariant";

    private final UserVariantRepository userVariantRepository;

    public UserVariantResource(UserVariantRepository userVariantRepository) {
        this.userVariantRepository = userVariantRepository;
    }

    /**
     * POST  /user-variants : Create a new userVariant.
     *
     * @param userVariant the userVariant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userVariant, or with status 400 (Bad Request) if the userVariant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-variants")
    @Timed
    public ResponseEntity<UserVariant> createUserVariant(@RequestBody UserVariant userVariant) throws URISyntaxException {
        log.debug("REST request to save UserVariant : {}", userVariant);
        if (userVariant.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userVariant cannot already have an ID")).body(null);
        }
        UserVariant result = userVariantRepository.save(userVariant);
        return ResponseEntity.created(new URI("/api/user-variants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-variants : Updates an existing userVariant.
     *
     * @param userVariant the userVariant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userVariant,
     * or with status 400 (Bad Request) if the userVariant is not valid,
     * or with status 500 (Internal Server Error) if the userVariant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-variants")
    @Timed
    public ResponseEntity<UserVariant> updateUserVariant(@RequestBody UserVariant userVariant) throws URISyntaxException {
        log.debug("REST request to update UserVariant : {}", userVariant);
        if (userVariant.getId() == null) {
            return createUserVariant(userVariant);
        }
        UserVariant result = userVariantRepository.save(userVariant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userVariant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-variants : get all the userVariants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userVariants in body
     */
    @GetMapping("/user-variants")
    @Timed
    public List<UserVariant> getAllUserVariants() {
        log.debug("REST request to get all UserVariants");
        return userVariantRepository.findAll();
        }

    /**
     * GET  /user-variants/:id : get the "id" userVariant.
     *
     * @param id the id of the userVariant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userVariant, or with status 404 (Not Found)
     */
    @GetMapping("/user-variants/{id}")
    @Timed
    public ResponseEntity<UserVariant> getUserVariant(@PathVariable Long id) {
        log.debug("REST request to get UserVariant : {}", id);
        UserVariant userVariant = userVariantRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userVariant));
    }

    /**
     * DELETE  /user-variants/:id : delete the "id" userVariant.
     *
     * @param id the id of the userVariant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-variants/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserVariant(@PathVariable Long id) {
        log.debug("REST request to delete UserVariant : {}", id);
        userVariantRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
