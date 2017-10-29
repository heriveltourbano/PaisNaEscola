package br.com.unifae.software.eng.paisnaescola.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.unifae.software.eng.paisnaescola.domain.Escola;

import br.com.unifae.software.eng.paisnaescola.repository.EscolaRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Escola.
 */
@RestController
@RequestMapping("/api")
public class EscolaResource {

    private final Logger log = LoggerFactory.getLogger(EscolaResource.class);

    private static final String ENTITY_NAME = "escola";

    private final EscolaRepository escolaRepository;

    public EscolaResource(EscolaRepository escolaRepository) {
        this.escolaRepository = escolaRepository;
    }

    /**
     * POST  /escolas : Create a new escola.
     *
     * @param escola the escola to create
     * @return the ResponseEntity with status 201 (Created) and with body the new escola, or with status 400 (Bad Request) if the escola has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/escolas")
    @Timed
    public ResponseEntity<Escola> createEscola(@Valid @RequestBody Escola escola) throws URISyntaxException {
        log.debug("REST request to save Escola : {}", escola);
        if (escola.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new escola cannot already have an ID")).body(null);
        }
        Escola result = escolaRepository.save(escola);
        return ResponseEntity.created(new URI("/api/escolas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /escolas : Updates an existing escola.
     *
     * @param escola the escola to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated escola,
     * or with status 400 (Bad Request) if the escola is not valid,
     * or with status 500 (Internal Server Error) if the escola couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/escolas")
    @Timed
    public ResponseEntity<Escola> updateEscola(@Valid @RequestBody Escola escola) throws URISyntaxException {
        log.debug("REST request to update Escola : {}", escola);
        if (escola.getId() == null) {
            return createEscola(escola);
        }
        Escola result = escolaRepository.save(escola);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, escola.getId().toString()))
            .body(result);
    }

    /**
     * GET  /escolas : get all the escolas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of escolas in body
     */
    @GetMapping("/escolas")
    @Timed
    public ResponseEntity<List<Escola>> getAllEscolas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Escolas");
        Page<Escola> page = escolaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/escolas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /escolas/:id : get the "id" escola.
     *
     * @param id the id of the escola to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the escola, or with status 404 (Not Found)
     */
    @GetMapping("/escolas/{id}")
    @Timed
    public ResponseEntity<Escola> getEscola(@PathVariable Long id) {
        log.debug("REST request to get Escola : {}", id);
        Escola escola = escolaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(escola));
    }

    /**
     * DELETE  /escolas/:id : delete the "id" escola.
     *
     * @param id the id of the escola to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/escolas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEscola(@PathVariable Long id) {
        log.debug("REST request to delete Escola : {}", id);
        escolaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
