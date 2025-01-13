package com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins;

import com.example.Benny_Bach_Coupons_Project_SpringV.services.AdminService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.ClientService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CompanyService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.sql.SQLException;

@Component
public class LoginManager {
    @Autowired
    ApplicationContext ctx;


    public LoginManager() {
    }


    /**
     * Login for different services ,First we set ClientService to null in order
     * to return it in the end if login was successful .
     * Then we run switch on clientType cases ,
     * Each clientType case creates instance of service according to clientType.
     * Once clientType is set system will check if the email and password match and exist in DB and
     * the clientType , if login was successful (adminService.login(email, password)) instance will be created , if
     * not SQLException.
     * <p>
     * Notes :
     * 1.ApplicationContext set as AutoWired in that case injection will be done by Spring upon running the app
     * through the ApplicationContext that will be injected from Main class, instance of beans can be created
     * and managed by spring.
     * 2.CompanyService and CustomerService Scope is set to @Prototype which means that upon each request
     * of one of them Spring will create new instance of the object so in that case multiple services
     * can operate at the same time. Note! that Admin service is remain as singleton since only
     * one Admin currently exist, Means that one instance will be created across the system.
     *
     * @param clientType
     * @param email
     * @param password
     * @return
     * @throws SQLException if credentials are not found in DB and login failed.
     */
    public ClientService login(ClientType clientType, String email, String password) throws SQLException {
        ClientService clientService = null;

        // Use switch to determine client type and login
        switch (clientType) {
            case ADMINISTRATOR -> {
                AdminService adminService = ctx.getBean(AdminService.class);
                if (adminService.login(email, password)) {
                    clientService = adminService;
                } else {
                    throw new SQLException("Failed login: Incorrect email or password for Admin");
                }
            }
            case COMPANY -> {
                CompanyService companyService = ctx.getBean(CompanyService.class);
                if (companyService.login(email, password)) {
                    clientService = companyService;
                } else {
                    throw new SQLException("Failed login: Incorrect email or password for Company");
                }
            }
            case CUSTOMER -> {
                CustomerService customerService = ctx.getBean(CustomerService.class);
                if (customerService.login(email, password)) {
                    clientService = customerService;
                } else {
                    throw new SQLException("Failed login: Incorrect email or password for Customer");
                }
            }
        }
        return clientService;
    }
}