package com.example.Benny_Bach_Coupons_Project_SpringV.services;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CompanyRepository;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CouponsRepository;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CustomerRepository;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CustomerVsCouponsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public abstract class ClientService {
    @Autowired
    protected CompanyRepository companyRepository;
    @Autowired
    protected CustomerRepository customerRepository;
    @Autowired
    protected CouponsRepository couponsRepository;
    @Autowired
    protected CustomerVsCouponsRepo customerVsCouponsRepo;

    public ClientService() {
    }

    public abstract boolean login(String email, String password) throws SQLException;


}
