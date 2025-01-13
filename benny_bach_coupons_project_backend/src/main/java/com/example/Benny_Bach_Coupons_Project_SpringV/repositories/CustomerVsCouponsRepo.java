package com.example.Benny_Bach_Coupons_Project_SpringV.repositories;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Category;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.CustomersVsCoupons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerVsCouponsRepo extends JpaRepository<CustomersVsCoupons,Integer> {

    /**
     * Finds all purchased coupons by specific customer.
     * @param customerId ID of customer to find purchased coupons.
     * @return all CustomersVsCoupons row's found with ID of the customer (which includes coupon ID and customer ID).
     */
    List<CustomersVsCoupons> findByCustomerId(int customerId);
    /**
     * Finds all customers that purchased specific coupon.
     * @param couponId coupon ID to find purchased history.
     * @return all CustomersVsCoupons row's found with ID of the coupon(which includes coupon ID and customer ID).
     */
    List<CustomersVsCoupons> findByCouponId(int couponId);

    CustomersVsCoupons findByCouponIdAndCustomerId(int couponId,int customerId);
    /**
     * check if specific coupon purchased by specific customer before.
     * @param couponId ID of coupon to check.
     * @param customerId ID of customer to check.
     * @return if couponId and customerId found in one row from CustomerVsCoupons table will return true, else false.
     */
    boolean existsByCouponIdAndCustomerId(int couponId,int customerId);
}
