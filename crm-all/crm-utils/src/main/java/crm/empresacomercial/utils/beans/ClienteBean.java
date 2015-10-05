package crm.empresacomercial.utils.beans;

import java.util.Date;
import java.util.List;

import crm.empresacomercial.utils.BaseBean;

public class ClienteBean extends BaseBean {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nmCliente;
	private Date dtCadastro;
	private String email;
	private String logradouro;
	private int nrEndereco;
	private int telefone;
	private int tpCliente;
	private char cpfCnpj;
	private String cidade;
	private String estado;
	private int porte;
	private List<ContatoBean> contatos;
	private Double limiteCredito;

	public ClienteBean() {
	}

	public Long getId() {
		return id;
	}
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

	public int getTelefone() {
		return telefone;
	}

	public void setTelefone(int telefone) {
		this.telefone = telefone;
	}

	public int getTpCliente() {
		return tpCliente;
	}

	public void setTpCliente(int tpCliente) {
		this.tpCliente = tpCliente;
	}

	public char getCpfCnpj() {
		return cpfCnpj;
	}

	public void setCpfCnpj(char cpfCnpj) {
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

	public List<ContatoBean> getContatos() {
		return contatos;
	}

	public void setContatos(List<ContatoBean> contatos) {
		this.contatos = contatos;
	}

	public Double getLimiteCredito() {
		return limiteCredito;
	}

	public void setLimiteCredito(Double limiteCredito) {
		this.limiteCredito = limiteCredito;
	}

}
