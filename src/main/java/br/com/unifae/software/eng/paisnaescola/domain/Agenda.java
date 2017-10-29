package br.com.unifae.software.eng.paisnaescola.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * Entidade Agenda de compromissos
 */
@ApiModel(description = "Entidade Agenda de compromissos")
@Entity
@Table(name = "agenda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agenda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "inicio", nullable = false)
    private ZonedDateTime inicio;

    @NotNull
    @Column(name = "termino", nullable = false)
    private ZonedDateTime termino;

    @Size(max = 512)
    @Column(name = "descricao", length = 512)
    private String descricao;

    @ManyToOne
    private Classe classe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getInicio() {
        return inicio;
    }

    public Agenda inicio(ZonedDateTime inicio) {
        this.inicio = inicio;
        return this;
    }

    public void setInicio(ZonedDateTime inicio) {
        this.inicio = inicio;
    }

    public ZonedDateTime getTermino() {
        return termino;
    }

    public Agenda termino(ZonedDateTime termino) {
        this.termino = termino;
        return this;
    }

    public void setTermino(ZonedDateTime termino) {
        this.termino = termino;
    }

    public String getDescricao() {
        return descricao;
    }

    public Agenda descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Classe getClasse() {
        return classe;
    }

    public Agenda classe(Classe classe) {
        this.classe = classe;
        return this;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Agenda agenda = (Agenda) o;
        if (agenda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agenda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agenda{" +
            "id=" + getId() +
            ", inicio='" + getInicio() + "'" +
            ", termino='" + getTermino() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
