package crm.empresacomercial.utils.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TESTE")
public class Teste {

	@Id
	@GeneratedValue
	@Column(name="ID")
	private Long id;

	@Column(name="INTEIRO")
	private int inteiro;

	@Column(name="TEXT")
	private String text;

	public Teste() {

	}

	public int getInteiro() {
		return inteiro;
	}

	public void setInteiro(int inteiro) {
		this.inteiro = inteiro;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

}
