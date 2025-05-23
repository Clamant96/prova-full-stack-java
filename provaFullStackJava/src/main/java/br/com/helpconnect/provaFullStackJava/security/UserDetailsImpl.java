package br.com.helpconnect.provaFullStackJava.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.helpconnect.provaFullStackJava.model.Usuario;

public class UserDetailsImpl implements UserDetails {
	
	//informando a versão que está sendo passada - userdetails
	private static final long serialVersionUID = 1L;
	
	private String userName;
	private String password;
	private List<GrantedAuthority> authorities;
	// lista que guarda quais são as autorizações que o usuario tem acesso
	

	public UserDetailsImpl(Usuario user) {
        this.userName = user.getEmail();
        this.password = user.getSenha();
        this.authorities = user.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                .collect(Collectors.toList());
    }
	
	public UserDetailsImpl() {}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		// se a conta do usuario nao expirou, ele acessa
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// se a conta não expirar, acessa 
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// se a credencial não estiver expirada, acessa 
		return true;
	}

	@Override
	public boolean isEnabled() {
		// se o usuario está habilitado, acessa
		return true;
	}

}
