package crm.empresacomercial.service.utils;

public class ServiceWarnException extends Exception {

	private static final long serialVersionUID = 1L;
	public ServiceWarnException() {
		super();
	}
	public ServiceWarnException(String msg)   {
		super(msg);
	}
	public ServiceWarnException(String msg, Exception e)  {
		super(msg, e);
	}

}
