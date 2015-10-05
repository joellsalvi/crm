package crm.empresacomercial.service.utils;

public class ServiceErrorException extends Exception {

	private static final long serialVersionUID = 1L;
	public ServiceErrorException() {
		super();
	}
	public ServiceErrorException(String msg)   {
		super(msg);
	}
	public ServiceErrorException(String msg, Exception e)  {
		super(msg, e);
	}

}
