package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Classe;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Classe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasseRepository extends JpaRepository<Classe,Long> {
    
    @Query("select distinct classe from Classe classe left join fetch classe.professors left join fetch classe.alunos")
    List<Classe> findAllWithEagerRelationships();

    @Query("select classe from Classe classe left join fetch classe.professors left join fetch classe.alunos where classe.id =:id")
    Classe findOneWithEagerRelationships(@Param("id") Long id);
    
}
