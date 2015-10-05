package crm.empresacomercial.data.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import crm.empresacomercial.utils.entities.ClienteEntity;

public interface IClienteRepository extends JpaRepository<ClienteEntity, Long> {

	//	@Query("SELECT u FROM UserEntity u WHERE u.email = ?1")
	//	public UserEntity findByEmail(String email);

	@Query("SELECT p FROM ClienteEntity p WHERE p.nmCliente LIKE ?1")
	public List<ClienteEntity> findByNmCliente(String nmCLiente);

}
