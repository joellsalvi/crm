package crm.empresacomercial.data.utils;

import java.io.Serializable;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

import crm.empresacomercial.utils.BaseEntity;
import crm.empresacomercial.utils.data.IGenericData;

public abstract class GenericData<T extends BaseEntity<ID>, ID extends Serializable>
implements IGenericData<T, ID> {

	private static final Logger LOGGER = Logger.getLogger(GenericData.class);

	protected static final int DEFAULT_SIZE = 10;

	protected static final int DEFAULT_PAGE = 0;

	@Autowired
	protected JpaRepository<T, ID> genericRepository;

	@Override
	public List<T> findAll() {
		return this.genericRepository.findAll();
	}

	@Override
	public List<T> findAll(Integer page, Integer size, String... fields) {
		Sort sort = this.mountSort(Direction.ASC, fields);

		if ((page != null) || (size != null)) {
			if (page == null) {
				page = DEFAULT_PAGE;
			} else if (size == null) {
				size = DEFAULT_SIZE;
			}

			return this.genericRepository.findAll(
					this.mountPage(page, size, sort)).getContent();
		} else if (sort != null) {
			return this.genericRepository.findAll(sort);
		} else {
			return this.genericRepository.findAll();
		}
	}

	@Override
	public List<T> findAllDesc(Integer page, Integer size, String... fields) {
		Sort sort = this.mountSort(Direction.DESC, fields);

		if ((page != null) || (size != null)) {
			if (page == null) {
				page = DEFAULT_PAGE;
			} else if (size == null) {
				size = DEFAULT_SIZE;
			}

			return this.genericRepository.findAll(
					this.mountPage(page, size, sort)).getContent();
		} else if (sort != null) {
			return this.genericRepository.findAll(sort);
		} else {
			return this.genericRepository.findAll();
		}
	}

	@Override
	public T add(T entityObject) {
		entityObject.setId(null);

		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug(String.format("Adding a new record [%s].",
					entityObject));
		}

		return this.genericRepository.save(entityObject);
	}

	@Override
	public void update(T entityObject) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug(String.format("Updating the entity [%s].",
					entityObject));
		}

		this.genericRepository.save(entityObject);
	}

	@Override
	public void delete(T entityObject) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug(String.format("Deleting the entity [%s].",
					entityObject));
		}

		this.genericRepository.delete(entityObject);
	}

	@Override
	public T findById(ID id) {
		return this.genericRepository.findOne(id);
	}

	protected PageRequest mountPage(Integer page, Integer size, Sort sort) {
		return new PageRequest(page, size, sort);
	}

	protected Sort mountSort(Direction direction, String[] fields) {
		if ((fields == null) || (fields.length <= 0)) {
			return null;
		}

		return new Sort(direction, fields);
	}

}
