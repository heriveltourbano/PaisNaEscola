package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Responsavel;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Responsavel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResponsavelRepository extends JpaRepository<Responsavel,Long> {
    
}
