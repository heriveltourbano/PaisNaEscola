package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Mensagem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mensagem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MensagemRepository extends JpaRepository<Mensagem,Long> {
    
}
