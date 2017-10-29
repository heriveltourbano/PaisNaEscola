package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Escola;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Escola entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EscolaRepository extends JpaRepository<Escola,Long> {
    
}
