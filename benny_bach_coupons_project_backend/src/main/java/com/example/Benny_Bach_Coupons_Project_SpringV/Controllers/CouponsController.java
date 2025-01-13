package com.example.Benny_Bach_Coupons_Project_SpringV.Controllers;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CouponsRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coupons")
@CrossOrigin
public class CouponsController {
    private final CouponsRepository couponsRepository;

    public CouponsController(CouponsRepository couponsRepository) {
        this.couponsRepository = couponsRepository;
    }

    @GetMapping
    public List<Coupon> getAllCoupons(){
        return couponsRepository.findAll();
    }
}
