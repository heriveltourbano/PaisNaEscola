package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Secretaria;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Secretaria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SecretariaRepository extends JpaRepository<Secretaria,Long> {
    
}
