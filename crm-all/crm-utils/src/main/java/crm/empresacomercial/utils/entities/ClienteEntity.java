package crm.empresacomercial.utils.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import crm.empresacomercial.utils.BaseEntity;

@Entity
@Table(name="tb_cliente")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClienteEntity extends BaseEntity<Long> {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="ID_CLIENTE")
	private Long id;

	@Column(name="NM_CLIENTE")
	private String nmCliente;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="DT_CADASTRO")
	private Date dtCadastro;

	@Column(name="EMAIL")
	private String email;

	@Column(name="LOGRADOURO")
	private String logradouro;

	@Column(name="NR_ENDERECO")
	private int nrEndereco;

	@Column(name="TELEFONE")
	private String telefone;

	/**
	 * 1 = Física 2 = Jurídica
	 */
	@Column(name="TP_CLIENTE")
	private int tpCliente;

	@Column(name="CPF_CNPJ")
	private String cpfCnpj;

	@Column(name="CIDADE")
	private String cidade;

	@Column(name="ESTADO")
	private String estado;

	/**
	 * 1 = Micro, 2 = Pequeno, 3 = Médio, 4 = Grande
	 */
	@Column(name="PORTE")
	private int porte;

	/**
	 * Valor em moeda que determina o montante máximo de pendencias
	 * financeiras que o cliente pode possuir com a empresa em um dado momento
	 */
	@Column(name="LIMITE_CREDITO")
	private Double limiteCredito;

	@OneToMany(mappedBy="cliente")
	@Transient
	private List<ContatoEntity> contatos;

	public ClienteEntity() {
	}

	@Override
	public Long getId() {
		return this.id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public String getNmCliente() {
		return nmCliente;
	}

	public void setNmCliente(String nmCliente) {
		this.nmCliente = nmCliente;
	}

	public Date getDtCadastro() {
		return dtCadastro;
	}

	public void setDtCadastro(Date dtCadastro) {
		this.dtCadastro = dtCadastro;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public int getNrEndereco() {
		return nrEndereco;
	}

	public void setNrEndereco(int nrEndereco) {
		this.nrEndereco = nrEndereco;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public int getTpCliente() {
		return tpCliente;
	}

	public void setTpCliente(int tpCliente) {
		this.tpCliente = tpCliente;
	}

	public String getCpfCnpj() {
		return cpfCnpj;
	}

	public void setCpfCnpj(String cpfCnpj) {
		this.cpfCnpj = cpfCnpj;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public int getPorte() {
		return porte;
	}

	public void setPorte(int porte) {
		this.porte = porte;
	}

	public Double getLimiteCredito() {
		return limiteCredito;
	}

	public void setLimiteCredito(Double limiteCredito) {
		this.limiteCredito = limiteCredito;
	}

	public List<ContatoEntity> getContatos() {
		return contatos;
	}

	public void setContatos(List<ContatoEntity> contatos) {
		this.contatos = contatos;
	}

}