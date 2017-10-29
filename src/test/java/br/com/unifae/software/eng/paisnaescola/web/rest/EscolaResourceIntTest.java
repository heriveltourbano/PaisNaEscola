package br.com.unifae.software.eng.paisnaescola.web.rest;

import br.com.unifae.software.eng.paisnaescola.PaisNaEscolaApp;

import br.com.unifae.software.eng.paisnaescola.domain.Escola;
import br.com.unifae.software.eng.paisnaescola.repository.EscolaRepository;
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
 * Test class for the EscolaResource REST controller.
 *
 * @see EscolaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaisNaEscolaApp.class)
public class EscolaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private EscolaRepository escolaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEscolaMockMvc;

    private Escola escola;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        EscolaResource escolaResource = new EscolaResource(escolaRepository);
        this.restEscolaMockMvc = MockMvcBuilders.standaloneSetup(escolaResource)
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
    public static Escola createEntity(EntityManager em) {
        Escola escola = new Escola()
            .nome(DEFAULT_NOME);
        return escola;
    }

    @Before
    public void initTest() {
        escola = createEntity(em);
    }

    @Test
    @Transactional
    public void createEscola() throws Exception {
        int databaseSizeBeforeCreate = escolaRepository.findAll().size();

        // Create the Escola
        restEscolaMockMvc.perform(post("/api/escolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isCreated());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeCreate + 1);
        Escola testEscola = escolaList.get(escolaList.size() - 1);
        assertThat(testEscola.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createEscolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escolaRepository.findAll().size();

        // Create the Escola with an existing ID
        escola.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscolaMockMvc.perform(post("/api/escolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = escolaRepository.findAll().size();
        // set the field null
        escola.setNome(null);

        // Create the Escola, which fails.

        restEscolaMockMvc.perform(post("/api/escolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isBadRequest());

        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEscolas() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        // Get all the escolaList
        restEscolaMockMvc.perform(get("/api/escolas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escola.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        // Get the escola
        restEscolaMockMvc.perform(get("/api/escolas/{id}", escola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(escola.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEscola() throws Exception {
        // Get the escola
        restEscolaMockMvc.perform(get("/api/escolas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);
        int databaseSizeBeforeUpdate = escolaRepository.findAll().size();

        // Update the escola
        Escola updatedEscola = escolaRepository.findOne(escola.getId());
        updatedEscola
            .nome(UPDATED_NOME);

        restEscolaMockMvc.perform(put("/api/escolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEscola)))
            .andExpect(status().isOk());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeUpdate);
        Escola testEscola = escolaList.get(escolaList.size() - 1);
        assertThat(testEscola.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingEscola() throws Exception {
        int databaseSizeBeforeUpdate = escolaRepository.findAll().size();

        // Create the Escola

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEscolaMockMvc.perform(put("/api/escolas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isCreated());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);
        int databaseSizeBeforeDelete = escolaRepository.findAll().size();

        // Get the escola
        restEscolaMockMvc.perform(delete("/api/escolas/{id}", escola.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Escola.class);
        Escola escola1 = new Escola();
        escola1.setId(1L);
        Escola escola2 = new Escola();
        escola2.setId(escola1.getId());
        assertThat(escola1).isEqualTo(escola2);
        escola2.setId(2L);
        assertThat(escola1).isNotEqualTo(escola2);
        escola1.setId(null);
        assertThat(escola1).isNotEqualTo(escola2);
    }
}
