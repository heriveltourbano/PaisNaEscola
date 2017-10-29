package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Agenda;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Agenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaRepository extends JpaRepository<Agenda,Long> {
    
}
