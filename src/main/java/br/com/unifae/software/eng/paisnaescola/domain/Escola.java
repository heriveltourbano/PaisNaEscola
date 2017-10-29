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
 * Entidade Escola
 */
@ApiModel(description = "Entidade Escola")
@Entity
@Table(name = "escola")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Escola implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 60)
    @Column(name = "nome", length = 60, nullable = false)
    private String nome;

    @OneToMany(mappedBy = "escola")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Classe> classes = new HashSet<>();

    @OneToMany(mappedBy = "escola")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Secretaria> secretarias = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Escola nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public Escola classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public Escola addClasse(Classe classe) {
        this.classes.add(classe);
        classe.setEscola(this);
        return this;
    }

    public Escola removeClasse(Classe classe) {
        this.classes.remove(classe);
        classe.setEscola(null);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    public Set<Secretaria> getSecretarias() {
        return secretarias;
    }

    public Escola secretarias(Set<Secretaria> secretarias) {
        this.secretarias = secretarias;
        return this;
    }

    public Escola addSecretaria(Secretaria secretaria) {
        this.secretarias.add(secretaria);
        secretaria.setEscola(this);
        return this;
    }

    public Escola removeSecretaria(Secretaria secretaria) {
        this.secretarias.remove(secretaria);
        secretaria.setEscola(null);
        return this;
    }

    public void setSecretarias(Set<Secretaria> secretarias) {
        this.secretarias = secretarias;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Escola escola = (Escola) o;
        if (escola.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), escola.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Escola{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
