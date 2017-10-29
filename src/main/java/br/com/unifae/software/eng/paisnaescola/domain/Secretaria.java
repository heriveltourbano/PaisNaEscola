package br.com.unifae.software.eng.paisnaescola.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * Entidade Usuario Secretaria da Escola
 */
@ApiModel(description = "Entidade Usuario Secretaria da Escola")
@Entity
@Table(name = "secretaria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Secretaria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @ManyToOne
    private Escola escola;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Secretaria usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Escola getEscola() {
        return escola;
    }

    public Secretaria escola(Escola escola) {
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
        Secretaria secretaria = (Secretaria) o;
        if (secretaria.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), secretaria.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Secretaria{" +
            "id=" + getId() +
            "}";
    }
}
