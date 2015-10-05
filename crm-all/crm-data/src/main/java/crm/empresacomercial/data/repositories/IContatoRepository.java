package crm.empresacomercial.data.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import crm.empresacomercial.utils.entities.ClienteEntity;
import crm.empresacomercial.utils.entities.ContatoEntity;

public interface IContatoRepository extends JpaRepository<ContatoEntity, Long> {

	List<ContatoEntity> findByCliente(ClienteEntity cliente);

}
