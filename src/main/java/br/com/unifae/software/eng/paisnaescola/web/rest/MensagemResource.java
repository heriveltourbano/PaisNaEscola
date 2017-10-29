package br.com.unifae.software.eng.paisnaescola.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.unifae.software.eng.paisnaescola.domain.Mensagem;

import br.com.unifae.software.eng.paisnaescola.repository.MensagemRepository;
import br.com.unifae.software.eng.paisnaescola.web.rest.util.HeaderUtil;
import br.com.unifae.software.eng.paisnaescola.web.rest.util.PaginationUtil;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mensagem.
 */
@RestController
@RequestMapping("/api")
public class MensagemResource {

    private final Logger log = LoggerFactory.getLogger(MensagemResource.class);

    private static final String ENTITY_NAME = "mensagem";

    private final MensagemRepository mensagemRepository;

    public MensagemResource(MensagemRepository mensagemRepository) {
        this.mensagemRepository = mensagemRepository;
    }

    /**
     * POST  /mensagems : Create a new mensagem.
     *
     * @param mensagem the mensagem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mensagem, or with status 400 (Bad Request) if the mensagem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mensagems")
    @Timed
    public ResponseEntity<Mensagem> createMensagem(@RequestBody Mensagem mensagem) throws URISyntaxException {
        log.debug("REST request to save Mensagem : {}", mensagem);
        if (mensagem.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mensagem cannot already have an ID")).body(null);
        }
        Mensagem result = mensagemRepository.save(mensagem);
        return ResponseEntity.created(new URI("/api/mensagems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mensagems : Updates an existing mensagem.
     *
     * @param mensagem the mensagem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mensagem,
     * or with status 400 (Bad Request) if the mensagem is not valid,
     * or with status 500 (Internal Server Error) if the mensagem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mensagems")
    @Timed
    public ResponseEntity<Mensagem> updateMensagem(@RequestBody Mensagem mensagem) throws URISyntaxException {
        log.debug("REST request to update Mensagem : {}", mensagem);
        if (mensagem.getId() == null) {
            return createMensagem(mensagem);
        }
        Mensagem result = mensagemRepository.save(mensagem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mensagem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mensagems : get all the mensagems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mensagems in body
     */
    @GetMapping("/mensagems")
    @Timed
    public ResponseEntity<List<Mensagem>> getAllMensagems(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Mensagems");
        Page<Mensagem> page = mensagemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mensagems");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mensagems/:id : get the "id" mensagem.
     *
     * @param id the id of the mensagem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mensagem, or with status 404 (Not Found)
     */
    @GetMapping("/mensagems/{id}")
    @Timed
    public ResponseEntity<Mensagem> getMensagem(@PathVariable Long id) {
        log.debug("REST request to get Mensagem : {}", id);
        Mensagem mensagem = mensagemRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mensagem));
    }

    /**
     * DELETE  /mensagems/:id : delete the "id" mensagem.
     *
     * @param id the id of the mensagem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mensagems/{id}")
    @Timed
    public ResponseEntity<Void> deleteMensagem(@PathVariable Long id) {
        log.debug("REST request to delete Mensagem : {}", id);
        mensagemRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
