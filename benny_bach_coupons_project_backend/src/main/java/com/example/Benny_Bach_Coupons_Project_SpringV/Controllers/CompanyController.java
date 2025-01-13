package com.example.Benny_Bach_Coupons_Project_SpringV.Controllers;

import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.ClientType;
import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.LoginManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.Security.SessionManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Category;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CompanyService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/Company")
public class CompanyController {
    private SessionManager sessionManager;


    public CompanyController(SessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    private CompanyService getInstance(String token) throws Exception {
        token =token.replace("Bearer ", "");
        CompanyService companyService = (CompanyService) sessionManager.getService(token);
        sessionManager.updateSessionExpiration(token);
        return companyService;
    }


    @GetMapping
    public Company getCompanyDetails(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getCompanyDetails();
    }

    @GetMapping("/coupons")
    public List<Coupon> getAllCoupons(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getCompanyCoupons();
    }

    @GetMapping("/coupons/category/{category}")
    public List<Coupon> couponsByCategory(@RequestHeader(value = "Authorization") String token, @PathVariable Category category) throws Exception {
        return getInstance(token).getCompanyCoupons(category);
    }

    @GetMapping("/coupons/maxprice/{maxPrice}")
    public List<Coupon> couponsByMaxPrice(@RequestHeader(value = "Authorization") String token, @PathVariable double maxPrice) throws Exception {
        return getInstance(token).getCompanyCoupons(maxPrice);
    }

    @GetMapping("/coupons/soldtotal")
    public int totalSold(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).totalSold();
    }

    @DeleteMapping("/deleteOne/{id}")
    public void deleteOneCoupon(@RequestHeader(value = "Authorization") String token , @PathVariable int id) throws Exception {
        getInstance(token).deleteCoupon(id);
    }

    @PutMapping("/update")
    public void  updateCoupon(@RequestHeader(value = "Authorization") String token, @RequestBody Coupon coupon) throws Exception {
        getInstance(token).updateCoupon(coupon);
    }

    @PostMapping("/add")
    public void addCoupon(@RequestHeader(value = "Authorization") String token, @RequestBody Coupon coupon) throws Exception {
        getInstance(token).addCoupon(coupon);
    }



}
