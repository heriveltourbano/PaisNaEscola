package br.com.unifae.software.eng.paisnaescola.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Entidade Aluno
 */
@ApiModel(description = "Entidade Aluno")
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "aluno_responsavel",
               joinColumns = @JoinColumn(name="alunos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="responsavels_id", referencedColumnName="id"))
    private Set<Responsavel> responsavels = new HashSet<>();

    @ManyToMany(mappedBy = "alunos")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Classe> classes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Aluno usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Responsavel> getResponsavels() {
        return responsavels;
    }

    public Aluno responsavels(Set<Responsavel> responsavels) {
        this.responsavels = responsavels;
        return this;
    }

    public Aluno addResponsavel(Responsavel responsavel) {
        this.responsavels.add(responsavel);
        responsavel.getAlunos().add(this);
        return this;
    }

    public Aluno removeResponsavel(Responsavel responsavel) {
        this.responsavels.remove(responsavel);
        responsavel.getAlunos().remove(this);
        return this;
    }

    public void setResponsavels(Set<Responsavel> responsavels) {
        this.responsavels = responsavels;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public Aluno classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public Aluno addClasse(Classe classe) {
        this.classes.add(classe);
        classe.getAlunos().add(this);
        return this;
    }

    public Aluno removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.getAlunos().remove(this);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Aluno aluno = (Aluno) o;
        if (aluno.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aluno.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            "}";
    }
}
