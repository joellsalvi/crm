package crm.empresacomercial.utils.data;

import java.util.List;

import crm.empresacomercial.utils.entities.ClienteEntity;

public interface IClienteData extends IGenericData<ClienteEntity, Long> {

	ClienteEntity salvarCliente(ClienteEntity cliente);

	void excluirCliente(ClienteEntity cliente);

	List<ClienteEntity> pesquisar(String nmCliente);

	List<ClienteEntity> listarClientes();

}
