package br.com.unifae.software.eng.paisnaescola.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import br.com.unifae.software.eng.paisnaescola.domain.enumeration.SituacaoMsg;

/**
 * Entidade Mensagem
 */
@ApiModel(description = "Entidade Mensagem")
@Entity
@Table(name = "mensagem")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mensagem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mensagem")
    private String mensagem;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoMsg situacao;

    @Column(name = "criada")
    private ZonedDateTime criada;

    @Column(name = "enviada")
    private ZonedDateTime enviada;

    @Column(name = "recebida")
    private ZonedDateTime recebida;

    @Column(name = "lida")
    private ZonedDateTime lida;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario remetente;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario destinatario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMensagem() {
        return mensagem;
    }

    public Mensagem mensagem(String mensagem) {
        this.mensagem = mensagem;
        return this;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public SituacaoMsg getSituacao() {
        return situacao;
    }

    public Mensagem situacao(SituacaoMsg situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoMsg situacao) {
        this.situacao = situacao;
    }

    public ZonedDateTime getCriada() {
        return criada;
    }

    public Mensagem criada(ZonedDateTime criada) {
        this.criada = criada;
        return this;
    }

    public void setCriada(ZonedDateTime criada) {
        this.criada = criada;
    }

    public ZonedDateTime getEnviada() {
        return enviada;
    }

    public Mensagem enviada(ZonedDateTime enviada) {
        this.enviada = enviada;
        return this;
    }

    public void setEnviada(ZonedDateTime enviada) {
        this.enviada = enviada;
    }

    public ZonedDateTime getRecebida() {
        return recebida;
    }

    public Mensagem recebida(ZonedDateTime recebida) {
        this.recebida = recebida;
        return this;
    }

    public void setRecebida(ZonedDateTime recebida) {
        this.recebida = recebida;
    }

    public ZonedDateTime getLida() {
        return lida;
    }

    public Mensagem lida(ZonedDateTime lida) {
        this.lida = lida;
        return this;
    }

    public void setLida(ZonedDateTime lida) {
        this.lida = lida;
    }

    public Usuario getRemetente() {
        return remetente;
    }

    public Mensagem remetente(Usuario usuario) {
        this.remetente = usuario;
        return this;
    }

    public void setRemetente(Usuario usuario) {
        this.remetente = usuario;
    }

    public Usuario getDestinatario() {
        return destinatario;
    }

    public Mensagem destinatario(Usuario usuario) {
        this.destinatario = usuario;
        return this;
    }

    public void setDestinatario(Usuario usuario) {
        this.destinatario = usuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mensagem mensagem = (Mensagem) o;
        if (mensagem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mensagem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mensagem{" +
            "id=" + getId() +
            ", mensagem='" + getMensagem() + "'" +
            ", situacao='" + getSituacao() + "'" +
            ", criada='" + getCriada() + "'" +
            ", enviada='" + getEnviada() + "'" +
            ", recebida='" + getRecebida() + "'" +
            ", lida='" + getLida() + "'" +
            "}";
    }
}
