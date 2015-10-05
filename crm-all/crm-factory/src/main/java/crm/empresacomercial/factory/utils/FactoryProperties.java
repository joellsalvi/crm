package crm.empresacomercial.factory.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:factory.properties")
public class FactoryProperties {

	@Value("${factory.cors.allowedorigins}")
	private List<String> corsAllowedOrigins;

	public FactoryProperties() {
	}

	public List<String> getCorsAllowedOrigins() {
		return this.corsAllowedOrigins;
	}

}
