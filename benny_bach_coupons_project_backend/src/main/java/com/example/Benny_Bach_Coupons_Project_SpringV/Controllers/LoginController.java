package com.example.Benny_Bach_Coupons_Project_SpringV.Controllers;

import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.ClientType;
import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.LoginManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.Security.Session;
import com.example.Benny_Bach_Coupons_Project_SpringV.Security.SessionManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.Security.TokenManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.AdminService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.ClientService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CompanyService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CustomerService;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;


@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    private LoginManager loginManager;
    private TokenManager tokenManager;
    private SessionManager sessionManager;

    public LoginController(LoginManager loginManager, TokenManager tokenManager,SessionManager sessionManager) {
        this.loginManager = loginManager;
        this.tokenManager = tokenManager;
        this.sessionManager = sessionManager;
    }

    /**
     * This end point created for client service login ,
     * each client service has login function that checks
     * if exist in DB by email password . If exist in DB unique token will be created  or returned if logged in recently .
     * @param clientType which client type attempts to log in ?
     * @param email email for login
     * @param password password for login
     * @return string token for Front End to store token for future requests.
     * @throws SQLException if email and password were not found in DB by chosed client service.
     */
    @GetMapping
    public String login(ClientType clientType, String email, String password) throws SQLException {
        if (clientType.equals(ClientType.ADMINISTRATOR)) {
            AdminService adminService = (AdminService) loginManager.login(clientType, email, password);
            return getNewTokenOrExistingOne(clientType,email,password,adminService);
        } else if (clientType.equals(ClientType.COMPANY)) {
            CompanyService companyService =(CompanyService) loginManager.login(clientType,email,password);
            return getNewTokenOrExistingOne(clientType,email,password,companyService);
        } else if (clientType.equals(ClientType.CUSTOMER)) {
            CustomerService customerService = (CustomerService) loginManager.login(clientType,email,password);
            return getNewTokenOrExistingOne(clientType,email,password,customerService);
        }
        return "";
    }

    @PostMapping("/logout")
    public void logout( String token){
        sessionManager.endSession(token);
    }

    /**
     * This function is to check if instance on token already made by any user type otherwise generates new accordingly .
     * If a user log's in and tries to log in from different computer first token will be delivered second time ,
     * This made to prevent multiple generations of token for 1 user .
     * Either you got or we create one upon successful log in.
     * To achieve this each session added to sessions receives unique id that contains
     * clientType+email+password. Later in session manager this unique id will be checked if exist or not .
     * @param clientType what client type attempts to log in to indicate which logic to apply in switch case .
     * @param email
     * @param password
     * @param clientService
     * @return returns either new token or existed one.
     */
    public String getNewTokenOrExistingOne(ClientType clientType , String email , String password,ClientService clientService){
        String id = clientType+email+password;
        String token = "";
        switch (clientType){
            case ADMINISTRATOR -> {
                if(sessionManager.checkIfSessionAlreadyExist(id).equals("new")){
                    token = tokenManager.createToken((AdminService) clientService);
                    sessionManager.addSession(token,new Session((AdminService) clientService, TokenManager.setExpiredInMinutes(30),id));
                }else {
                    token= sessionManager.checkIfSessionAlreadyExist(id);
                }
            }
            case COMPANY -> {
                if(sessionManager.checkIfSessionAlreadyExist(id).equals("new")){
                    token = tokenManager.createToken((CompanyService) clientService);
                    sessionManager.addSession(token,new Session((CompanyService) clientService, TokenManager.setExpiredInMinutes(30),id));
                }else {
                    token= sessionManager.checkIfSessionAlreadyExist(id);
                }
            }
            case CUSTOMER -> {
                if(sessionManager.checkIfSessionAlreadyExist(id).equals("new")){
                    token = tokenManager.createToken((CustomerService) clientService);
                    sessionManager.addSession(token,new Session((CustomerService) clientService, TokenManager.setExpiredInMinutes(30),id));
                }else {
                    token= sessionManager.checkIfSessionAlreadyExist(id);
                }
            }
        }
        return token;
    }




}
