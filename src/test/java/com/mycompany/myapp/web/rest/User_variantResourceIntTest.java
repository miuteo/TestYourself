package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.TestYourselfApp;

import com.mycompany.myapp.domain.User_variant;
import com.mycompany.myapp.repository.User_variantRepository;
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
 * Test class for the User_variantResource REST controller.
 *
 * @see User_variantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestYourselfApp.class)
public class User_variantResourceIntTest {

    private static final Variant DEFAULT_VARIANT = Variant.A;
    private static final Variant UPDATED_VARIANT = Variant.B;

    @Autowired
    private User_variantRepository user_variantRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUser_variantMockMvc;

    private User_variant user_variant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final User_variantResource user_variantResource = new User_variantResource(user_variantRepository);
        this.restUser_variantMockMvc = MockMvcBuilders.standaloneSetup(user_variantResource)
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
    public static User_variant createEntity(EntityManager em) {
        User_variant user_variant = new User_variant()
            .variant(DEFAULT_VARIANT);
        return user_variant;
    }

    @Before
    public void initTest() {
        user_variant = createEntity(em);
    }

    @Test
    @Transactional
    public void createUser_variant() throws Exception {
        int databaseSizeBeforeCreate = user_variantRepository.findAll().size();

        // Create the User_variant
        restUser_variantMockMvc.perform(post("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user_variant)))
            .andExpect(status().isCreated());

        // Validate the User_variant in the database
        List<User_variant> user_variantList = user_variantRepository.findAll();
        assertThat(user_variantList).hasSize(databaseSizeBeforeCreate + 1);
        User_variant testUser_variant = user_variantList.get(user_variantList.size() - 1);
        assertThat(testUser_variant.getVariant()).isEqualTo(DEFAULT_VARIANT);
    }

    @Test
    @Transactional
    public void createUser_variantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = user_variantRepository.findAll().size();

        // Create the User_variant with an existing ID
        user_variant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUser_variantMockMvc.perform(post("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user_variant)))
            .andExpect(status().isBadRequest());

        // Validate the User_variant in the database
        List<User_variant> user_variantList = user_variantRepository.findAll();
        assertThat(user_variantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUser_variants() throws Exception {
        // Initialize the database
        user_variantRepository.saveAndFlush(user_variant);

        // Get all the user_variantList
        restUser_variantMockMvc.perform(get("/api/user-variants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(user_variant.getId().intValue())))
            .andExpect(jsonPath("$.[*].variant").value(hasItem(DEFAULT_VARIANT.toString())));
    }

    @Test
    @Transactional
    public void getUser_variant() throws Exception {
        // Initialize the database
        user_variantRepository.saveAndFlush(user_variant);

        // Get the user_variant
        restUser_variantMockMvc.perform(get("/api/user-variants/{id}", user_variant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(user_variant.getId().intValue()))
            .andExpect(jsonPath("$.variant").value(DEFAULT_VARIANT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUser_variant() throws Exception {
        // Get the user_variant
        restUser_variantMockMvc.perform(get("/api/user-variants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUser_variant() throws Exception {
        // Initialize the database
        user_variantRepository.saveAndFlush(user_variant);
        int databaseSizeBeforeUpdate = user_variantRepository.findAll().size();

        // Update the user_variant
        User_variant updatedUser_variant = user_variantRepository.findOne(user_variant.getId());
        updatedUser_variant
            .variant(UPDATED_VARIANT);

        restUser_variantMockMvc.perform(put("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUser_variant)))
            .andExpect(status().isOk());

        // Validate the User_variant in the database
        List<User_variant> user_variantList = user_variantRepository.findAll();
        assertThat(user_variantList).hasSize(databaseSizeBeforeUpdate);
        User_variant testUser_variant = user_variantList.get(user_variantList.size() - 1);
        assertThat(testUser_variant.getVariant()).isEqualTo(UPDATED_VARIANT);
    }

    @Test
    @Transactional
    public void updateNonExistingUser_variant() throws Exception {
        int databaseSizeBeforeUpdate = user_variantRepository.findAll().size();

        // Create the User_variant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUser_variantMockMvc.perform(put("/api/user-variants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user_variant)))
            .andExpect(status().isCreated());

        // Validate the User_variant in the database
        List<User_variant> user_variantList = user_variantRepository.findAll();
        assertThat(user_variantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUser_variant() throws Exception {
        // Initialize the database
        user_variantRepository.saveAndFlush(user_variant);
        int databaseSizeBeforeDelete = user_variantRepository.findAll().size();

        // Get the user_variant
        restUser_variantMockMvc.perform(delete("/api/user-variants/{id}", user_variant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<User_variant> user_variantList = user_variantRepository.findAll();
        assertThat(user_variantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(User_variant.class);
        User_variant user_variant1 = new User_variant();
        user_variant1.setId(1L);
        User_variant user_variant2 = new User_variant();
        user_variant2.setId(user_variant1.getId());
        assertThat(user_variant1).isEqualTo(user_variant2);
        user_variant2.setId(2L);
        assertThat(user_variant1).isNotEqualTo(user_variant2);
        user_variant1.setId(null);
        assertThat(user_variant1).isNotEqualTo(user_variant2);
    }
}
