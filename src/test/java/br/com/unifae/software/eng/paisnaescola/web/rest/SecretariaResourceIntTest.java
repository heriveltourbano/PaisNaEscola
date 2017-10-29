package br.com.unifae.software.eng.paisnaescola.web.rest;

import br.com.unifae.software.eng.paisnaescola.PaisNaEscolaApp;

import br.com.unifae.software.eng.paisnaescola.domain.Secretaria;
import br.com.unifae.software.eng.paisnaescola.repository.SecretariaRepository;
import br.com.unifae.software.eng.paisnaescola.web.rest.errors.ExceptionTranslator;

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

/**
 * Test class for the SecretariaResource REST controller.
 *
 * @see SecretariaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaisNaEscolaApp.class)
public class SecretariaResourceIntTest {

    @Autowired
    private SecretariaRepository secretariaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSecretariaMockMvc;

    private Secretaria secretaria;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SecretariaResource secretariaResource = new SecretariaResource(secretariaRepository);
        this.restSecretariaMockMvc = MockMvcBuilders.standaloneSetup(secretariaResource)
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
    public static Secretaria createEntity(EntityManager em) {
        Secretaria secretaria = new Secretaria();
        return secretaria;
    }

    @Before
    public void initTest() {
        secretaria = createEntity(em);
    }

    @Test
    @Transactional
    public void createSecretaria() throws Exception {
        int databaseSizeBeforeCreate = secretariaRepository.findAll().size();

        // Create the Secretaria
        restSecretariaMockMvc.perform(post("/api/secretarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secretaria)))
            .andExpect(status().isCreated());

        // Validate the Secretaria in the database
        List<Secretaria> secretariaList = secretariaRepository.findAll();
        assertThat(secretariaList).hasSize(databaseSizeBeforeCreate + 1);
        Secretaria testSecretaria = secretariaList.get(secretariaList.size() - 1);
    }

    @Test
    @Transactional
    public void createSecretariaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = secretariaRepository.findAll().size();

        // Create the Secretaria with an existing ID
        secretaria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSecretariaMockMvc.perform(post("/api/secretarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secretaria)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Secretaria> secretariaList = secretariaRepository.findAll();
        assertThat(secretariaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSecretarias() throws Exception {
        // Initialize the database
        secretariaRepository.saveAndFlush(secretaria);

        // Get all the secretariaList
        restSecretariaMockMvc.perform(get("/api/secretarias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(secretaria.getId().intValue())));
    }

    @Test
    @Transactional
    public void getSecretaria() throws Exception {
        // Initialize the database
        secretariaRepository.saveAndFlush(secretaria);

        // Get the secretaria
        restSecretariaMockMvc.perform(get("/api/secretarias/{id}", secretaria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(secretaria.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSecretaria() throws Exception {
        // Get the secretaria
        restSecretariaMockMvc.perform(get("/api/secretarias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSecretaria() throws Exception {
        // Initialize the database
        secretariaRepository.saveAndFlush(secretaria);
        int databaseSizeBeforeUpdate = secretariaRepository.findAll().size();

        // Update the secretaria
        Secretaria updatedSecretaria = secretariaRepository.findOne(secretaria.getId());

        restSecretariaMockMvc.perform(put("/api/secretarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSecretaria)))
            .andExpect(status().isOk());

        // Validate the Secretaria in the database
        List<Secretaria> secretariaList = secretariaRepository.findAll();
        assertThat(secretariaList).hasSize(databaseSizeBeforeUpdate);
        Secretaria testSecretaria = secretariaList.get(secretariaList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingSecretaria() throws Exception {
        int databaseSizeBeforeUpdate = secretariaRepository.findAll().size();

        // Create the Secretaria

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSecretariaMockMvc.perform(put("/api/secretarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(secretaria)))
            .andExpect(status().isCreated());

        // Validate the Secretaria in the database
        List<Secretaria> secretariaList = secretariaRepository.findAll();
        assertThat(secretariaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSecretaria() throws Exception {
        // Initialize the database
        secretariaRepository.saveAndFlush(secretaria);
        int databaseSizeBeforeDelete = secretariaRepository.findAll().size();

        // Get the secretaria
        restSecretariaMockMvc.perform(delete("/api/secretarias/{id}", secretaria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Secretaria> secretariaList = secretariaRepository.findAll();
        assertThat(secretariaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Secretaria.class);
        Secretaria secretaria1 = new Secretaria();
        secretaria1.setId(1L);
        Secretaria secretaria2 = new Secretaria();
        secretaria2.setId(secretaria1.getId());
        assertThat(secretaria1).isEqualTo(secretaria2);
        secretaria2.setId(2L);
        assertThat(secretaria1).isNotEqualTo(secretaria2);
        secretaria1.setId(null);
        assertThat(secretaria1).isNotEqualTo(secretaria2);
    }
}
