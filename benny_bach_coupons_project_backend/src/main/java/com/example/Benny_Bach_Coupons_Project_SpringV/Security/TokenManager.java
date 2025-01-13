package com.example.Benny_Bach_Coupons_Project_SpringV.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.ClientType;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.AdminService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CompanyService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CustomerService;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class TokenManager {


    /**
     * This method creates JWT token.
     * @param adminService used upon creation of the token as information in the token.
     * @return String JWT token.
     */
    public String createToken(AdminService adminService){
        return JWT.create().withIssuer("AdminBen")
                .withHeader(Map.of("Authorization", "Bearer"))
                .withIssuedAt(new Date())
                .withClaim("userName","ADMIN")
                .withClaim("clientType", ClientType.ADMINISTRATOR.toString())
                .withExpiresAt(setExpiredInMinutes(30))
                .sign(Algorithm.none());
    }

    /**
     * This method creates JWT token.
     * @param companyService used upon creation of the token as information in the token.
     * @return String JWT token.
     */
    public String createToken(CompanyService companyService){
        return JWT.create().withIssuer("AdminBen")
                .withHeader(Map.of("Authorization", "Bearer"))
                .withIssuedAt(new Date())
                .withClaim("userName",companyService.getCompanyDetails().getName())
                .withClaim("clientType", ClientType.COMPANY.toString())
                .withExpiresAt(setExpiredInMinutes(30))
                .sign(Algorithm.none());
    }

    /**
     * This method creates JWT token.
     * @param customerService used upon creation of the token as information in the token.
     * @return String JWT token.
     */
    public String createToken(CustomerService customerService){
        return JWT.create().withIssuer("AdminBen")
                .withHeader(Map.of("Authorization", "Bearer"))
                .withIssuedAt(new Date())
                .withClaim("userName",customerService.getCustomerDetails().getFirstName())
                .withClaim("clientType", ClientType.CUSTOMER.toString())
//                .withHeader()
                .withExpiresAt(setExpiredInMinutes(30))
                .sign(Algorithm.none());
    }


    /**
     * This method is to set expired date by adding long to current time in millis.
     * @param minutes this param will be used to decide how much time will be added to current time in millis.
     * @return New Date as format with current time + minutes(param).
     */
    public static Date setExpiredInMinutes(int minutes){
        long currentTimeMillis = System.currentTimeMillis();
        long expirationTimeMillis = currentTimeMillis + (minutes * 60 * 1000);
        return new Date(expirationTimeMillis);
    }


}
