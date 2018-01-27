package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestYourselfApp;

import com.mycompany.myapp.domain.UserVariant;
import com.mycompany.myapp.repository.UserVariantRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.Variant;
/**
 * Test class for the UserVariantResource REST controller.
 *
 * @see UserVariantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestYourselfApp.class)
public class UserVariantResourceIntTest {

    private static final Variant DEFAULT_VARIANT = Variant.A;
    private static final Variant UPDATED_VARIANT = Variant.B;

    @Autowired
    private UserVariantRepository userVariantRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserVariantMockMvc;

    private UserVariant userVariant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserVariantResource userVariantResource = new UserVariantResource(userVariantRepository);
        this.restUserVariantMockMvc = MockMvcBuilders.standaloneSetup(userVariantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserVariant createEntity(EntityManager em) {
        UserVariant userVariant = new UserVariant()
            .variant(DEFAULT_VARIANT);
        return userVariant;
    }

    @Before
    public void initTest() {
        userVariant = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserVariant() throws Exception {
        int databaseSizeBeforeCreate = userVariantRepository.findAll().size();

        // Create the UserVariant
        restUserVariantMockMvc.perform(post("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVariant)))
            .andExpect(status().isCreated());

        // Validate the UserVariant in the database
        List<UserVariant> userVariantList = userVariantRepository.findAll();
        assertThat(userVariantList).hasSize(databaseSizeBeforeCreate + 1);
        UserVariant testUserVariant = userVariantList.get(userVariantList.size() - 1);
        assertThat(testUserVariant.getVariant()).isEqualTo(DEFAULT_VARIANT);
    }

    @Test
    @Transactional
    public void createUserVariantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userVariantRepository.findAll().size();

        // Create the UserVariant with an existing ID
        userVariant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserVariantMockMvc.perform(post("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVariant)))
            .andExpect(status().isBadRequest());

        // Validate the UserVariant in the database
        List<UserVariant> userVariantList = userVariantRepository.findAll();
        assertThat(userVariantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserVariants() throws Exception {
        // Initialize the database
        userVariantRepository.saveAndFlush(userVariant);

        // Get all the userVariantList
        restUserVariantMockMvc.perform(get("/api/user-variants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userVariant.getId().intValue())))
            .andExpect(jsonPath("$.[*].variant").value(hasItem(DEFAULT_VARIANT.toString())));
    }

    @Test
    @Transactional
    public void getUserVariant() throws Exception {
        // Initialize the database
        userVariantRepository.saveAndFlush(userVariant);

        // Get the userVariant
        restUserVariantMockMvc.perform(get("/api/user-variants/{id}", userVariant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userVariant.getId().intValue()))
            .andExpect(jsonPath("$.variant").value(DEFAULT_VARIANT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserVariant() throws Exception {
        // Get the userVariant
        restUserVariantMockMvc.perform(get("/api/user-variants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserVariant() throws Exception {
        // Initialize the database
        userVariantRepository.saveAndFlush(userVariant);
        int databaseSizeBeforeUpdate = userVariantRepository.findAll().size();

        // Update the userVariant
        UserVariant updatedUserVariant = userVariantRepository.findOne(userVariant.getId());
        updatedUserVariant
            .variant(UPDATED_VARIANT);

        restUserVariantMockMvc.perform(put("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserVariant)))
            .andExpect(status().isOk());

        // Validate the UserVariant in the database
        List<UserVariant> userVariantList = userVariantRepository.findAll();
        assertThat(userVariantList).hasSize(databaseSizeBeforeUpdate);
        UserVariant testUserVariant = userVariantList.get(userVariantList.size() - 1);
        assertThat(testUserVariant.getVariant()).isEqualTo(UPDATED_VARIANT);
    }

    @Test
    @Transactional
    public void updateNonExistingUserVariant() throws Exception {
        int databaseSizeBeforeUpdate = userVariantRepository.findAll().size();

        // Create the UserVariant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserVariantMockMvc.perform(put("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userVariant)))
            .andExpect(status().isCreated());

        // Validate the UserVariant in the database
        List<UserVariant> userVariantList = userVariantRepository.findAll();
        assertThat(userVariantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserVariant() throws Exception {
        // Initialize the database
        userVariantRepository.saveAndFlush(userVariant);
        int databaseSizeBeforeDelete = userVariantRepository.findAll().size();

        // Get the userVariant
        restUserVariantMockMvc.perform(delete("/api/user-variants/{id}", userVariant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserVariant> userVariantList = userVariantRepository.findAll();
        assertThat(userVariantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserVariant.class);
        UserVariant userVariant1 = new UserVariant();
        userVariant1.setId(1L);
        UserVariant userVariant2 = new UserVariant();
        userVariant2.setId(userVariant1.getId());
        assertThat(userVariant1).isEqualTo(userVariant2);
        userVariant2.setId(2L);
        assertThat(userVariant1).isNotEqualTo(userVariant2);
        userVariant1.setId(null);
        assertThat(userVariant1).isNotEqualTo(userVariant2);
    }
}
