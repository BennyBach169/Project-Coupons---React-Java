package com.example.Benny_Bach_Coupons_Project_SpringV.Controllers;

import com.example.Benny_Bach_Coupons_Project_SpringV.Security.SessionManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private SessionManager sessionManager;

    public AdminController(SessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    private AdminService getInstance(String token) throws Exception {
        token = token.replace("Bearer ", "");
        AdminService adminService = (AdminService) sessionManager.getService(token);
        sessionManager.updateSessionExpiration(token);
        return adminService;
    }


    @GetMapping("/companies")
    public List<Company> getAllCompanies(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getAllCompanies();
    }


    @GetMapping("/getOneCompany/{id}")
    public Company getOneCompany(@RequestHeader(value = "Authorization") String token, @PathVariable int id) throws Exception {
        return getInstance(token).getOneCompany(id);
    }

    @GetMapping("/totalsold")
    public int totalSold(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).totalSold();
    }


    @PostMapping("/addCompany")
    public void addCompany(@RequestHeader(value = "Authorization") String token, @RequestBody Company company) throws Exception {
        getInstance(token).addCompany(company);
    }


    @PutMapping("/updateCompany")
    public void updateCompany(@RequestHeader(value = "Authorization") String token, @RequestBody Company company) throws Exception {
        getInstance(token).updateCompany(company);
    }


    @DeleteMapping("/company/{id}")
    public void deleteCompany(@RequestHeader(value = "Authorization") String token, @PathVariable int id) throws Exception {
        getInstance(token).deleteCompany(id);
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getAllCustomers();
    }


    @GetMapping("/customers/{id}")
    public Customer getOneCustomer(@RequestHeader(value = "Authorization") String token, @PathVariable int id) throws Exception {
        return getInstance(token).getOneCustomer(id);
    }


    @PostMapping("/addCustomer")
    public void addCustomer(@RequestHeader(value = "Authorization") String token, @RequestBody Customer customer) throws Exception {
        getInstance(token).addCustomer(customer);
    }


    @PutMapping("/updateCustomer")
    public void updateCustomer(@RequestHeader(value = "Authorization") String token, @RequestBody Customer customer) throws Exception {
       getInstance(token).updateCustomer(customer);
    }


    @DeleteMapping("/customer/{id}")
    public void deleteCustomer(@RequestHeader(value = "Authorization") String token, @PathVariable int id) throws Exception {
        getInstance(token).deleteCustomer(id);
    }


}

