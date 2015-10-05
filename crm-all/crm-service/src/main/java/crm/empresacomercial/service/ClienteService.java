package crm.empresacomercial.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import crm.empresacomercial.service.utils.GenericService;
import crm.empresacomercial.utils.data.IClienteData;
import crm.empresacomercial.utils.entities.ClienteEntity;
import crm.empresacomercial.utils.services.paths.IClienteService;

@Component
public class ClienteService extends GenericService<ClienteEntity, Long>
implements IClienteService {

	private static final Logger LOGGER = Logger.getLogger(ClienteService.class);

	@Autowired
	private IClienteData data;

	/**
	 * @author Joel Salvi
	 * @description Listar Clientes
	 * @return List<ClienteEntity>
	 */
	@Override
	public List<ClienteEntity> listar() {
		return data.listarClientes();
	}

	/**
	 * @author Joel Salvi
	 * @description Salva novo Cliente
	 * @param ClienteEntity
	 * @return ClienteEntity
	 */
	@Override
	public ClienteEntity salvarCliente(ClienteEntity cliente) {
		try {
			return data.salvarCliente(cliente);
		} catch(Exception ex) {
			LOGGER.error(ex, ex);
			throw ex;
		}
	}

	/**
	 * @author Joel Salvi
	 * @description Salva novo Cliente
	 * @param ClienteEntity
	 * @return ClienteEntity
	 */
	@Override
	public void excluirCliente(ClienteEntity cliente) {
		try {
			data.excluirCliente(cliente);
		} catch(Exception ex) {
			LOGGER.error(ex, ex);
			throw ex;
		}
	}

	/**
	 * @author Joel Salvi
	 * @description Pesquisar
	 * @param nmCliente
	 * @return List<ClienteEntity>
	 */
	@Override
	public List<ClienteEntity> pesquisar(String nmCliente) {
		try {
			return data.pesquisar(nmCliente);
		} catch(Exception ex) {
			LOGGER.error(ex, ex);
			throw ex;
		}
	}

}
