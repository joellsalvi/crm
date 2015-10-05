package crm.empresacomercial.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import crm.empresacomercial.data.repositories.IClienteRepository;
import crm.empresacomercial.data.utils.GenericData;
import crm.empresacomercial.utils.data.IClienteData;
import crm.empresacomercial.utils.data.IContatoData;
import crm.empresacomercial.utils.entities.ClienteEntity;
import crm.empresacomercial.utils.entities.ContatoEntity;

@Component
public class ClienteData extends GenericData<ClienteEntity, Long> implements IClienteData {

	@Autowired
	private IClienteRepository repository;

	@Autowired
	private IContatoData contatoData;

	@Override
	public List<ClienteEntity> listarClientes() {
		List<ClienteEntity> clientes = repository.findAll();
		for(ClienteEntity cliente : clientes) {
			cliente.setContatos(contatoData.listarContatosPorIdCliente(cliente.getId()));
		}
		return clientes;
	}

	@Override
	public ClienteEntity salvarCliente(ClienteEntity cliente) {
		return repository.saveAndFlush(cliente);
	}

	@Override
	public void excluirCliente(ClienteEntity cliente) {
		for(ContatoEntity contato : cliente.getContatos()) {
			contatoData.excluirContato(contato);
		}
		repository.delete(cliente);
	}

	@Override
	public List<ClienteEntity> pesquisar(String nmCliente) {
		return repository.findByNmCliente("%"+nmCliente+"%");
	}

}
