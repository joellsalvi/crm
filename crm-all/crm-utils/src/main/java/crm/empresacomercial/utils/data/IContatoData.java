package crm.empresacomercial.utils.data;

import java.util.List;

import crm.empresacomercial.utils.entities.ContatoEntity;

public interface IContatoData extends IGenericData<ContatoEntity, Long> {

	ContatoEntity salvarContato(ContatoEntity contatos);

	void excluirContato(ContatoEntity contato);

	List<ContatoEntity> listarContatosPorIdCliente(Long idCliente);

}
