package crm.empresacomercial.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import crm.empresacomercial.data.repositories.IContatoRepository;
import crm.empresacomercial.data.utils.GenericData;
import crm.empresacomercial.utils.data.IContatoData;
import crm.empresacomercial.utils.entities.ClienteEntity;
import crm.empresacomercial.utils.entities.ContatoEntity;

@Component
public class ContatoData extends GenericData<ContatoEntity, Long> implements IContatoData {

	@Autowired
	private IContatoRepository repository;

	@Override
	public ContatoEntity salvarContato(ContatoEntity contato) {
		return repository.saveAndFlush(contato);
	}

	@Override
	public void excluirContato(ContatoEntity contato) {
		repository.delete(contato);
	}

	@Override
	public List<ContatoEntity> listarContatosPorIdCliente(Long idCliente) {
		ClienteEntity cliente = new ClienteEntity();
		cliente.setId(idCliente);
		return repository.findByCliente(cliente);
	}

}
