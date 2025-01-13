package com.example.Benny_Bach_Coupons_Project_SpringV.Security;

import com.example.Benny_Bach_Coupons_Project_SpringV.services.ClientService;
import com.fasterxml.jackson.databind.DatabindException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
@Scope("prototype")
public class Session {
    private ClientService clientService;
    private Date expirationDate;
    private String userId;


    /**
     * Session class created in order to store active users that received token
     * upon login , and when will be expired.
     * @param clientService instance to store upon login
     * @param date when session will be expired.
     */
    public Session(ClientService clientService, Date date ) {
        this.clientService = clientService;
        this.expirationDate = date;
    }

    public Session(ClientService clientService, Date expirationDate, String userId) {
        this.clientService = clientService;
        this.expirationDate = expirationDate;
        this.userId = userId;
    }

    public void setExpirationDate(Date date){
        this.expirationDate = date;
    }

    public Date getExpirationDate(){
        return this.expirationDate;
    }

    public ClientService getClientService() {
        return clientService;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
