package br.com.unifae.software.eng.paisnaescola.web.rest;

import br.com.unifae.software.eng.paisnaescola.PaisNaEscolaApp;

import br.com.unifae.software.eng.paisnaescola.domain.Mensagem;
import br.com.unifae.software.eng.paisnaescola.repository.MensagemRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static br.com.unifae.software.eng.paisnaescola.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.unifae.software.eng.paisnaescola.domain.enumeration.SituacaoMsg;
/**
 * Test class for the MensagemResource REST controller.
 *
 * @see MensagemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PaisNaEscolaApp.class)
public class MensagemResourceIntTest {

    private static final String DEFAULT_MENSAGEM = "AAAAAAAAAA";
    private static final String UPDATED_MENSAGEM = "BBBBBBBBBB";

    private static final SituacaoMsg DEFAULT_SITUACAO = SituacaoMsg.CRIADA;
    private static final SituacaoMsg UPDATED_SITUACAO = SituacaoMsg.ENVIADA;

    private static final ZonedDateTime DEFAULT_CRIADA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CRIADA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_ENVIADA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ENVIADA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_RECEBIDA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_RECEBIDA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LIDA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LIDA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MensagemRepository mensagemRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMensagemMockMvc;

    private Mensagem mensagem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MensagemResource mensagemResource = new MensagemResource(mensagemRepository);
        this.restMensagemMockMvc = MockMvcBuilders.standaloneSetup(mensagemResource)
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
    public static Mensagem createEntity(EntityManager em) {
        Mensagem mensagem = new Mensagem()
            .mensagem(DEFAULT_MENSAGEM)
            .situacao(DEFAULT_SITUACAO)
            .criada(DEFAULT_CRIADA)
            .enviada(DEFAULT_ENVIADA)
            .recebida(DEFAULT_RECEBIDA)
            .lida(DEFAULT_LIDA);
        return mensagem;
    }

    @Before
    public void initTest() {
        mensagem = createEntity(em);
    }

    @Test
    @Transactional
    public void createMensagem() throws Exception {
        int databaseSizeBeforeCreate = mensagemRepository.findAll().size();

        // Create the Mensagem
        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isCreated());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeCreate + 1);
        Mensagem testMensagem = mensagemList.get(mensagemList.size() - 1);
        assertThat(testMensagem.getMensagem()).isEqualTo(DEFAULT_MENSAGEM);
        assertThat(testMensagem.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
        assertThat(testMensagem.getCriada()).isEqualTo(DEFAULT_CRIADA);
        assertThat(testMensagem.getEnviada()).isEqualTo(DEFAULT_ENVIADA);
        assertThat(testMensagem.getRecebida()).isEqualTo(DEFAULT_RECEBIDA);
        assertThat(testMensagem.getLida()).isEqualTo(DEFAULT_LIDA);
    }

    @Test
    @Transactional
    public void createMensagemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mensagemRepository.findAll().size();

        // Create the Mensagem with an existing ID
        mensagem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMensagems() throws Exception {
        // Initialize the database
        mensagemRepository.saveAndFlush(mensagem);

        // Get all the mensagemList
        restMensagemMockMvc.perform(get("/api/mensagems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mensagem.getId().intValue())))
            .andExpect(jsonPath("$.[*].mensagem").value(hasItem(DEFAULT_MENSAGEM.toString())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())))
            .andExpect(jsonPath("$.[*].criada").value(hasItem(sameInstant(DEFAULT_CRIADA))))
            .andExpect(jsonPath("$.[*].enviada").value(hasItem(sameInstant(DEFAULT_ENVIADA))))
            .andExpect(jsonPath("$.[*].recebida").value(hasItem(sameInstant(DEFAULT_RECEBIDA))))
            .andExpect(jsonPath("$.[*].lida").value(hasItem(sameInstant(DEFAULT_LIDA))));
    }

    @Test
    @Transactional
    public void getMensagem() throws Exception {
        // Initialize the database
        mensagemRepository.saveAndFlush(mensagem);

        // Get the mensagem
        restMensagemMockMvc.perform(get("/api/mensagems/{id}", mensagem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mensagem.getId().intValue()))
            .andExpect(jsonPath("$.mensagem").value(DEFAULT_MENSAGEM.toString()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()))
            .andExpect(jsonPath("$.criada").value(sameInstant(DEFAULT_CRIADA)))
            .andExpect(jsonPath("$.enviada").value(sameInstant(DEFAULT_ENVIADA)))
            .andExpect(jsonPath("$.recebida").value(sameInstant(DEFAULT_RECEBIDA)))
            .andExpect(jsonPath("$.lida").value(sameInstant(DEFAULT_LIDA)));
    }

    @Test
    @Transactional
    public void getNonExistingMensagem() throws Exception {
        // Get the mensagem
        restMensagemMockMvc.perform(get("/api/mensagems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMensagem() throws Exception {
        // Initialize the database
        mensagemRepository.saveAndFlush(mensagem);
        int databaseSizeBeforeUpdate = mensagemRepository.findAll().size();

        // Update the mensagem
        Mensagem updatedMensagem = mensagemRepository.findOne(mensagem.getId());
        updatedMensagem
            .mensagem(UPDATED_MENSAGEM)
            .situacao(UPDATED_SITUACAO)
            .criada(UPDATED_CRIADA)
            .enviada(UPDATED_ENVIADA)
            .recebida(UPDATED_RECEBIDA)
            .lida(UPDATED_LIDA);

        restMensagemMockMvc.perform(put("/api/mensagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMensagem)))
            .andExpect(status().isOk());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeUpdate);
        Mensagem testMensagem = mensagemList.get(mensagemList.size() - 1);
        assertThat(testMensagem.getMensagem()).isEqualTo(UPDATED_MENSAGEM);
        assertThat(testMensagem.getSituacao()).isEqualTo(UPDATED_SITUACAO);
        assertThat(testMensagem.getCriada()).isEqualTo(UPDATED_CRIADA);
        assertThat(testMensagem.getEnviada()).isEqualTo(UPDATED_ENVIADA);
        assertThat(testMensagem.getRecebida()).isEqualTo(UPDATED_RECEBIDA);
        assertThat(testMensagem.getLida()).isEqualTo(UPDATED_LIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingMensagem() throws Exception {
        int databaseSizeBeforeUpdate = mensagemRepository.findAll().size();

        // Create the Mensagem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMensagemMockMvc.perform(put("/api/mensagems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isCreated());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMensagem() throws Exception {
        // Initialize the database
        mensagemRepository.saveAndFlush(mensagem);
        int databaseSizeBeforeDelete = mensagemRepository.findAll().size();

        // Get the mensagem
        restMensagemMockMvc.perform(delete("/api/mensagems/{id}", mensagem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mensagem.class);
        Mensagem mensagem1 = new Mensagem();
        mensagem1.setId(1L);
        Mensagem mensagem2 = new Mensagem();
        mensagem2.setId(mensagem1.getId());
        assertThat(mensagem1).isEqualTo(mensagem2);
        mensagem2.setId(2L);
        assertThat(mensagem1).isNotEqualTo(mensagem2);
        mensagem1.setId(null);
        assertThat(mensagem1).isNotEqualTo(mensagem2);
    }
}
