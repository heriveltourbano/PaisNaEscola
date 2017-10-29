package br.com.unifae.software.eng.paisnaescola.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Entidade Classe
 */
@ApiModel(description = "Entidade Classe")
@Entity
@Table(name = "classe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 2017)
    @Max(value = 2100)
    @Column(name = "ano_letivo", nullable = false)
    private Integer anoLetivo;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "classe")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Agenda> agenda = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "classe_professor",
               joinColumns = @JoinColumn(name="classes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="professors_id", referencedColumnName="id"))
    private Set<Professor> professors = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "classe_aluno",
               joinColumns = @JoinColumn(name="classes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="alunos_id", referencedColumnName="id"))
    private Set<Aluno> alunos = new HashSet<>();

    @ManyToOne
    private Escola escola;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnoLetivo() {
        return anoLetivo;
    }

    public Classe anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Classe descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Agenda> getAgenda() {
        return agenda;
    }

    public Classe agenda(Set<Agenda> agenda) {
        this.agenda = agenda;
        return this;
    }

    public Classe addAgenda(Agenda agenda) {
        this.agenda.add(agenda);
        agenda.setClasse(this);
        return this;
    }

    public Classe removeAgenda(Agenda agenda) {
        this.agenda.remove(agenda);
        agenda.setClasse(null);
        return this;
    }

    public void setAgenda(Set<Agenda> agenda) {
        this.agenda = agenda;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public Classe professors(Set<Professor> professors) {
        this.professors = professors;
        return this;
    }

    public Classe addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.getClasses().add(this);
        return this;
    }

    public Classe removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.getClasses().remove(this);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        this.professors = professors;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Classe alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Classe addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.getClasses().add(this);
        return this;
    }

    public Classe removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.getClasses().remove(this);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Escola getEscola() {
        return escola;
    }

    public Classe escola(Escola escola) {
        this.escola = escola;
        return this;
    }

    public void setEscola(Escola escola) {
        this.escola = escola;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Classe classe = (Classe) o;
        if (classe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", anoLetivo='" + getAnoLetivo() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
