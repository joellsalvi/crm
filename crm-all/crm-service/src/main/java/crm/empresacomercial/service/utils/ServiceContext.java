package crm.empresacomercial.service.utils;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = { ServiceContext.BASE_PACKAGE })
public class ServiceContext {

	static final String BASE_PACKAGE = "crm.empresacomercial.service";

}
