package br.com.pedromota.naturassp.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class MyWebApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception{
		System.out.println("------- Configurando acessos -------");
		httpSecurity.csrf().disable()
							.authorizeRequests()
							//requisições liberadas
							.antMatchers(HttpMethod.GET, "/categoria").permitAll()
							.antMatchers(HttpMethod.GET,"/categoria/search").permitAll()
							.antMatchers(HttpMethod.GET,"/cliente/*").permitAll()
							.antMatchers(HttpMethod.POST, "/pedido").permitAll()
							.antMatchers(HttpMethod.GET,"/produto").permitAll()
							.antMatchers(HttpMethod.GET,"/produto/categoria/*").permitAll()
							.antMatchers(HttpMethod.GET,"/produto/*").permitAll()
							.antMatchers(HttpMethod.GET,"/produto/busca").permitAll()
							.antMatchers(HttpMethod.GET, "/produto").permitAll()
							.antMatchers(HttpMethod.POST, "/login").permitAll()
							.antMatchers(HttpMethod.PUT, "/usuario").permitAll()
						
							.anyRequest().authenticated().and().cors();
		
		httpSecurity.addFilterBefore(new TokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}
