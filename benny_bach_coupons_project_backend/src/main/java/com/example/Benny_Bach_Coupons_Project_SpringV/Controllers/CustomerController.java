package com.example.Benny_Bach_Coupons_Project_SpringV.Controllers;

import com.example.Benny_Bach_Coupons_Project_SpringV.Security.SessionManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Category;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CompanyService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private SessionManager sessionManager;

    public CustomerController(SessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    private CustomerService getInstance(String token) throws Exception {
        token =token.replace("Bearer ", "");
        CustomerService customerService = (CustomerService) sessionManager.getService(token);
        sessionManager.updateSessionExpiration(token);
        return customerService;
    }

    @GetMapping("/coupons")
    public List<Coupon> getCustomerCoupons(@RequestHeader(value = "Authorization") String token) throws Exception {
        return getInstance(token).getCustomerCoupons();
    }

    @GetMapping("/coupons/category/{category}")
    public List<Coupon> getCustomerCouponsByCategory(@RequestHeader(value = "Authorization") String token,@PathVariable("category") Category category) throws Exception {
        return getInstance(token).getCustomerCoupons(category);
    }

    @GetMapping("/coupons/maxprice/{maxPrice}")
    public List<Coupon> getCustomerCouponsByMaxPrice(@RequestHeader(value = "Authorization") String token,@PathVariable("maxPrice") double maxPrice) throws Exception {
        return getInstance(token).getCustomerCoupons(maxPrice);
    }

    @PostMapping("/purchase")
    public void purchaseCoupon(@RequestHeader(value = "Authorization") String token,@RequestBody Coupon coupon) throws Exception {
        getInstance(token).purchaseCoupon(coupon);
    }






}
