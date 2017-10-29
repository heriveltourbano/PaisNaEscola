package br.com.unifae.software.eng.paisnaescola.repository;

import br.com.unifae.software.eng.paisnaescola.domain.Aluno;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Aluno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlunoRepository extends JpaRepository<Aluno,Long> {
    
    @Query("select distinct aluno from Aluno aluno left join fetch aluno.responsavels")
    List<Aluno> findAllWithEagerRelationships();

    @Query("select aluno from Aluno aluno left join fetch aluno.responsavels where aluno.id =:id")
    Aluno findOneWithEagerRelationships(@Param("id") Long id);
    
}
