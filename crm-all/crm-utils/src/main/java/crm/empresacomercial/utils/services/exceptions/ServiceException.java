package crm.empresacomercial.utils.services.exceptions;

public class ServiceException extends RuntimeException {

	private static final long serialVersionUID = 201505141419L;

	public ServiceException() {
		super();
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(String message, Throwable throwable) {
		super(message, throwable);
	}

}
