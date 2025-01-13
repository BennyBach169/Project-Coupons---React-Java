package com.example.Benny_Bach_Coupons_Project_SpringV.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(2)
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private SessionManager sessionManager;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = request.getHeader("Authorization").replace("Bearer ", "");
//            DecodedJWT decoded = JWT.decode(token);
            if(sessionManager.checkIfKeyExists(token)&&!sessionManager.checkIfSessionExpired(token)) {
                filterChain.doFilter(request, response);
            }else {
                response.setStatus(401);
                response.getWriter().write("Unauthorized, please log in!");
            }
        }catch (Exception e){
            response.setStatus(401);
            response.getWriter().write("Unauthorized, please log in!");
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)  {
        return request.getServletPath().startsWith("/login") || request.getServletPath().startsWith("/coupons");
    }
}
