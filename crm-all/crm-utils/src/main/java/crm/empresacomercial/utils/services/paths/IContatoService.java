package crm.empresacomercial.utils.services.paths;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import crm.empresacomercial.utils.entities.ContatoEntity;
import crm.empresacomercial.utils.services.IGenericService;
import crm.empresacomercial.utils.services.ServiceConstants;
import crm.empresacomercial.utils.services.ServiceNames;

@Path(ServiceNames.CONTATO_PATH)
@Consumes(ServiceConstants.MEDIA_TYPE)
@Produces(ServiceConstants.MEDIA_TYPE)
public interface IContatoService extends IGenericService<ContatoEntity, Long> {

	@POST
	@Path("/salvarContato")
	ContatoEntity salvarContato(ContatoEntity contato);

	@POST
	@Path("/excluirContato")
	void excluirContato(ContatoEntity contato);

	@POST
	@Path("/listar")
	List<ContatoEntity> listarContatosPorIdCliente(Long idCliente);

}
