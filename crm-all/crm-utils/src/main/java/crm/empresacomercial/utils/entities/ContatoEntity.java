package crm.empresacomercial.utils.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import crm.empresacomercial.utils.BaseEntity;

@Entity
@Table(name="tb_contato")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContatoEntity extends BaseEntity<Long> {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="ID_CONTATO")
	private Long id;

	@Column(name="NM_CONTATO")
	private String nmContato;

	@Column(name="EMAIL")
	private String email;

	@Column(name="TELEFONE")
	private String telefone;

	/**
	 * opções: (1 = Comprador, 2 = Vendedor, 3 = Auxiliar Administrativo, 4 = Gerente, 5 = Diretor)
	 */
	@Column(name="CARGO")
	private int cargo;

	/**
	 * (Comercial,Financeiro,Serviços,Industria,Almoxarifado,Recursos Humanos,Fiscal, Contábil)
	 */
	@Column(name="DEPARTAMENTO")
	private int departamento;

	@ManyToOne
	@JoinColumn(name="ID_CLIENTE")
	private ClienteEntity cliente;

	public ContatoEntity() {
	}

	@Override
	public Long getId() {
		return this.id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public String getNmContato() {
		return nmContato;
	}

	public void setNmContato(String nmContato) {
		this.nmContato = nmContato;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public int getCargo() {
		return cargo;
	}

	public void setCargo(int cargo) {
		this.cargo = cargo;
	}

	public int getDepartamento() {
		return departamento;
	}

	public void setDepartamento(int departamento) {
		this.departamento = departamento;
	}

	public ClienteEntity getCliente() {
		return cliente;
	}

	public void setCliente(ClienteEntity cliente) {
		this.cliente = cliente;
	}

	public ClienteEntity getClienteEntity() {
		return this.cliente;
	}

	public void setClienteEntity(ClienteEntity cliente) {
		this.cliente = cliente;
	}

}