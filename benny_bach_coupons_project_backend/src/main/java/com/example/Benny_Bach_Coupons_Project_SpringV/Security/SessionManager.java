package com.example.Benny_Bach_Coupons_Project_SpringV.Security;

import com.auth0.jwt.JWT;
import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.ClientType;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.ClientService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Component
public class SessionManager {

    private HashMap<String, Session> sessions = new HashMap<>();


    /**
     * SessionManager created in order to store each session that created
     * upon login and managed it.
     *
     * @param sessions must receive key = token , value = session object.
     */
    public SessionManager(HashMap<String, Session> sessions) {
        this.sessions = sessions;
    }

    public String checkIfSessionAlreadyExist(String userId) {
        for (String t : sessions.keySet()) {
            if(sessions.get(t).getUserId() != null) {
                if (sessions.get(t).getUserId().equals(userId)) {
                    return t;
                }
            }
        }
        return "new";
    }

    /**
     * Adding a session to sessions.
     *
     * @param token   will be used as key in hashmap.
     * @param session will be used as value in hashmap.
     */
    public void addSession(String token, Session session) {
        sessions.put(token, session);
    }

    /**
     * Ending a session by removing it from hashmap list.
     *
     * @param token key of the object in array to remove.
     */
    public void endSession(String token) {
        sessions.remove(token);
    }


//  public ClientType decodeClientType(String token){
//    String type = String.valueOf(JWT.decode(token).getClaim("clientType"));
//    if (type.equals("COMPANY")){
//      return ClientType.COMPANY;
//    } else if (type.equals("ADMINISTRATOR")) {
//      return ClientType.ADMINISTRATOR;
//    }else {
//      return ClientType.CUSTOMER;
//    }
//  }

    /**
     * this function checks if object is exist in array by key.
     *
     * @param token key to find the object
     * @return boolean if object found by key in list returns true , else false.
     */
    public boolean checkIfKeyExists(String token) {
        return sessions.containsKey(token);
    }

    /**
     * Checks if key exist in array , if true returns the value .
     *
     * @param token key to find object in array.
     * @return client service from Session object .
     * @throws Exception if session not found by key , means user must login.
     */
    public ClientService getService(String token) throws Exception {
        if (checkIfKeyExists(token)) {
            return sessions.get(token).getClientService();
        } else {
            throw new Exception("Session is over please login again");
        }
    }

    /**
     * checks if session expired by key , if session found by key .
     * checking the expired date the stored in session object by comparing current
     * time against expired date from session.
     *
     * @param token key to find session.
     * @return if expired date is before current time returns true, else false.
     */
    public boolean checkIfSessionExpired(String token) {
        if (checkIfKeyExists(token)) {
            if (sessions.get(token).getExpirationDate().before(new Date(System.currentTimeMillis()))) {
                return true;
            }
        }
        return false;
    }


    /**
     * Setting the expiration date of session object by key if found by key ,
     * and not expired yet.
     *
     * @param token key to find session.
     * @throws Exception if session not found , or expired already means expiration date cannot
     *                   extend.
     */
    public void updateSessionExpiration(String token) throws Exception {
        if (checkIfKeyExists(token)) {
            if (!checkIfSessionExpired(token)) {
                sessions.get(token).setExpirationDate(TokenManager.setExpiredInMinutes(30));
            } else throw new Exception("Sorry the session is over, please log in again");
        }
    }

    /**
     * This thread create to remove expired tokens.
     * First for loop will run on each key from sessions hashmap,
     * if session expired will be added to expTokens array(list of strings/tokens).
     * Second loop runs on each key from expTokens array and removes it from sessions
     * hashmap.
     */
    @Scheduled(fixedRate = 30 * 1000)
    public void removeExpiredSessions() {
        List<String> expTokens = new ArrayList<>();
        for (String t : sessions.keySet()) {
            if (checkIfSessionExpired(t)) {
                expTokens.add(t);
            }
        }
        for (String exp : expTokens) {
            endSession(exp);
        }
    }
}
