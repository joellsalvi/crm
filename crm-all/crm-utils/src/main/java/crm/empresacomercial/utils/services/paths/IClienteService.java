package crm.empresacomercial.utils.services.paths;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import crm.empresacomercial.utils.entities.ClienteEntity;
import crm.empresacomercial.utils.services.IGenericService;
import crm.empresacomercial.utils.services.ServiceConstants;
import crm.empresacomercial.utils.services.ServiceNames;

@Path(ServiceNames.CLIENTE_PATH)
@Consumes(ServiceConstants.MEDIA_TYPE)
@Produces(ServiceConstants.MEDIA_TYPE)
public interface IClienteService extends IGenericService<ClienteEntity, Long> {

	@GET
	@Path("/listar")
	List<ClienteEntity> listar();

	@POST
	@Path("/salvarCliente")
	ClienteEntity salvarCliente(ClienteEntity cliente);

	@POST
	@Path("/excluirCliente")
	void excluirCliente(ClienteEntity cliente);

	@POST
	@Path("/pesquisar")
	List<ClienteEntity> pesquisar(String nmCliente);

}
