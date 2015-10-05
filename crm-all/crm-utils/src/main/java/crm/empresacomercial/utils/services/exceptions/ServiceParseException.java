package crm.empresacomercial.utils.services.exceptions;

public class ServiceParseException extends RuntimeException {

	private static final long serialVersionUID = 201505141419L;

	public ServiceParseException() {
		super();
	}

	public ServiceParseException(String message) {
		super(message);
	}

	public ServiceParseException(String message, Throwable throwable) {
		super(message, throwable);
	}

}
