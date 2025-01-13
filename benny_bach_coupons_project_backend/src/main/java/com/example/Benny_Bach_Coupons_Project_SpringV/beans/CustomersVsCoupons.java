package com.example.Benny_Bach_Coupons_Project_SpringV.beans;


import jakarta.persistence.*;

import java.util.List;

@Entity
public class CustomersVsCoupons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;
    @ManyToOne
    @JoinColumn(name = "coupon_id",nullable = false)
    private Coupon coupon;
    @ManyToOne
    @JoinColumn(name = "customer_id",nullable = false)
    private Customer customer;


    public CustomersVsCoupons() {
    }

    public CustomersVsCoupons(Coupon coupon, Customer customer) {
        this.coupon = coupon;
        this.customer = customer;
    }


    public CustomersVsCoupons(int transactionId, Coupon coupon, Customer customer) {
        this.transactionId = transactionId;
        this.coupon = coupon;
        this.customer = customer;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "CustomersVsCoupons{" +
                "transactionId=" + transactionId +
                ", coupon=" + coupon +
                ", customer=" + customer +
                '}';
    }
}
