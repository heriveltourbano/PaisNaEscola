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
 * Entidade Responsavel pelo Aluno
 */
@ApiModel(description = "Entidade Responsavel pelo Aluno")
@Entity
@Table(name = "responsavel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Responsavel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @ManyToMany(mappedBy = "responsavels")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Responsavel usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Responsavel alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Responsavel addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.getResponsavels().add(this);
        return this;
    }

    public Responsavel removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.getResponsavels().remove(this);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Responsavel responsavel = (Responsavel) o;
        if (responsavel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), responsavel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Responsavel{" +
            "id=" + getId() +
            "}";
    }
}
