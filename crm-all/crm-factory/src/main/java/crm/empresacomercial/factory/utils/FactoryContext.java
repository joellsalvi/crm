package crm.empresacomercial.factory.utils;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import crm.empresacomercial.data.utils.DataContext;
import crm.empresacomercial.service.utils.ServiceContext;

@Configuration
@Import(value = { DataContext.class, ServiceContext.class })
@ComponentScan(basePackages = { FactoryContext.BASE_PACKAGE })
public class FactoryContext {

	static final String BASE_PACKAGE = "crm.empresacomercial.factory";

}
