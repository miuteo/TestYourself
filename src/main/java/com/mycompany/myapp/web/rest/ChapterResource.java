package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Chapter;

import com.mycompany.myapp.repository.ChapterRepository;
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

/**
 * REST controller for managing Chapter.
 */
@RestController
@RequestMapping("/api")
public class ChapterResource {

    private final Logger log = LoggerFactory.getLogger(ChapterResource.class);

    private static final String ENTITY_NAME = "chapter";

    private final ChapterRepository chapterRepository;

    public ChapterResource(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    /**
     * POST  /chapters : Create a new chapter.
     *
     * @param chapter the chapter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chapter, or with status 400 (Bad Request) if the chapter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chapters")
    @Timed
    public ResponseEntity<Chapter> createChapter(@Valid @RequestBody Chapter chapter) throws URISyntaxException {
        log.debug("REST request to save Chapter : {}", chapter);
        if (chapter.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new chapter cannot already have an ID")).body(null);
        }
        Chapter result = chapterRepository.save(chapter);
        return ResponseEntity.created(new URI("/api/chapters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chapters : Updates an existing chapter.
     *
     * @param chapter the chapter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chapter,
     * or with status 400 (Bad Request) if the chapter is not valid,
     * or with status 500 (Internal Server Error) if the chapter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chapters")
    @Timed
    public ResponseEntity<Chapter> updateChapter(@Valid @RequestBody Chapter chapter) throws URISyntaxException {
        log.debug("REST request to update Chapter : {}", chapter);
        if (chapter.getId() == null) {
            return createChapter(chapter);
        }
        Chapter result = chapterRepository.save(chapter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chapter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chapters : get all the chapters.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of chapters in body
     */
    @GetMapping("/chapters")
    @Timed
    public ResponseEntity<List<Chapter>> getAllChapters(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Chapters");
        Page<Chapter> page = chapterRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/chapters");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /chapters/:id : get the "id" chapter.
     *
     * @param id the id of the chapter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chapter, or with status 404 (Not Found)
     */
    @GetMapping("/chapters/{id}")
    @Timed
    public ResponseEntity<Chapter> getChapter(@PathVariable Long id) {
        log.debug("REST request to get Chapter : {}", id);
        Chapter chapter = chapterRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chapter));
    }

    /**
     * DELETE  /chapters/:id : delete the "id" chapter.
     *
     * @param id the id of the chapter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chapters/{id}")
    @Timed
    public ResponseEntity<Void> deleteChapter(@PathVariable Long id) {
        log.debug("REST request to delete Chapter : {}", id);
        chapterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
