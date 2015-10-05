package crm.empresacomercial.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import crm.empresacomercial.service.utils.GenericService;
import crm.empresacomercial.utils.data.IContatoData;
import crm.empresacomercial.utils.entities.ContatoEntity;
import crm.empresacomercial.utils.services.paths.IContatoService;

@Component
public class ContatoService extends GenericService<ContatoEntity, Long> implements IContatoService {

	private static final Logger LOGGER = Logger.getLogger(ClienteService.class);

	@Autowired
	private IContatoData data;

	/**
	 * @author Joel Salvi
	 * @description Salva novo Contato
	 * @param ContatoEntity
	 * @return ContatoEntity
	 */
	@Override
	public ContatoEntity salvarContato(ContatoEntity contato) {
		try {
			return data.salvarContato(contato);
		} catch(Exception ex) {
			LOGGER.error(ex, ex);
			throw ex;
		}
	}

	/**
	 * @author Joel Salvi
	 * @description Salva novo Contato
	 * @param ContatoEntity
	 * @return ContatoEntity
	 */
	@Override
	public void excluirContato(ContatoEntity contato) {
		try {
			data.excluirContato(contato);
		} catch(Exception ex) {
			LOGGER.error(ex, ex);
			throw ex;
		}
	}

	/**
	 * @author Joel Salvi
	 * @description Lista Contatos do cliente em questão
	 * @param idCliente
	 * @return List<ContatoEntity>
	 */
	@Override
	public List<ContatoEntity> listarContatosPorIdCliente(Long idCliente) {
		try {
			return data.listarContatosPorIdCliente(idCliente);
		} catch(Exception ex) {
			LOGGER.error(ex, ex);
			throw ex;
		}
	}

}
