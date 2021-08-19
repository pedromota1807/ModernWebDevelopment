package br.com.pedromota.naturassp.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class TokenFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		/*requisições que não precisam de autenticações, não levam em conta o cabeçalho
		 * o authorization
		 * requisições que precisam de autenticação, precisarão de informação de autorização no cabeçalho
		 * se o token for valido, monta-se um cabeçalho de autorização e encaminha a requisição
		 */
		System.out.println("**Requisição passou pelo filtro.**");
		
		if(request.getHeader("Authorization") != null) {
			Authentication auth = JWTTokenUtil.decodeToken(request);
			SecurityContextHolder.getContext().setAuthentication(auth);
			
		}
		filterChain.doFilter(request, response);
		
	}

}
