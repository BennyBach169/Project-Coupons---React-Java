package com.example.Benny_Bach_Coupons_Project_SpringV.services;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Category;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.CustomersVsCoupons;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Scope("prototype")
public class CustomerService extends ClientService {
    private boolean loggedIn = false;
    private Customer customer;

    /**
     * Customer login using email and password.
     * First, checks if the provided email and password exist in the database.
     * If exists, loggedIn will be set to true , and customer will be pulled to the class
     * for later use, finally method will return true for Login Manager.
     *
     * @param email Customer's email.
     * @param password Customer's password.
     * @return true if login is successful, else throws SQLException.
     * @throws SQLException if email and password not exist in one row.
     */
    @Override
    public boolean login(String email, String password) throws SQLException {
        if (customerRepository.existsByPasswordAndEmail(password, email)) {
            this.customer = customerRepository.findByEmail(email);
            this.loggedIn = true;
            return true;
        } else {
            throw new SQLException("Login failed one or two of details provided are incorrect");
        }
    }


    /**
     * If logged in customer to purchase a coupon.
     *  Check if coupon exist in the database by id from the coupon provided.
     *  If exist coupon will be pulled to "temp" to make sure all coupon details are original from data base.
     *  check if not been purchased by the same customer before.
     *  check if have more than 0 in amount.
     *  check if coupon not been expired.
     *  check if coupons start date passed current date.
     *  After validation, the coupon amount is decreased by 1, and the transaction is saved.
     *
     * @param coupon The coupon object to be purchased.
     * @throws SQLException If any of the validation checks fail.
     */
    public void purchaseCoupon(Coupon coupon) throws SQLException {
        if (loggedIn) {
            Coupon temp = couponsRepository.findById(coupon.getId()).orElseThrow(() -> new SQLException("Coupon not found with ID: " + coupon.getId()));
            if (customerVsCouponsRepo.existsByCouponIdAndCustomerId(temp.getId(), customer.getId())) {
                throw new SQLException("Sorry this coupon purchased by you already");
            } else if (temp.getAmount() <= 0) {
                throw new SQLException("Sorry this coupon has been sold out");
            } else if (couponsRepository.existsByIdAndEndDateBefore(temp.getId(), Date.valueOf(LocalDate.now()))) {
                throw new SQLException("Sorry this coupon has been expired");
            } else if (couponsRepository.existsByIdAndStartDateAfter(temp.getId(), Date.valueOf(LocalDate.now()))) {
                throw new SQLException("Sorry this coupon not started yet you can purchase it from "+temp.getStartDate());
            } else {
                temp.setAmount(temp.getAmount() - 1);
                couponsRepository.save(temp);
                customerVsCouponsRepo.save(new CustomersVsCoupons(temp, customer));
            }

        }
    }

    /**
     * Gets all coupons purchased by the logged in customer.
     * If not logged in, returns null.
     *
     * @return List of coupons purchased by the customer.
     */
    public List<Coupon> getCustomerCoupons() {
        if (loggedIn) {
            List<Coupon> customerCoupons = new ArrayList<>();
            for (CustomersVsCoupons c : customerVsCouponsRepo.findByCustomerId(customer.getId())) {
                customerCoupons.add(c.getCoupon());
            }
            return customerCoupons;
        }
        return null;
    }

    /**
     * Gets all coupons purchased by the logged in customer(condition was checked in getCustomerCoupons())  customer filtered
     * by specific category.
     * If not logged in, returns null.
     * "filter(coupon -> coupon.getCategory().equals(category))" will do the same as running for loop.
     * @return List of coupons purchased by the customer.
     */
    public List<Coupon> getCustomerCoupons(Category category) {
        return getCustomerCoupons().stream().
                filter(coupon -> coupon.getCategory().equals(category)).
                collect(Collectors.toList());
    }

    /**
     * Gets all coupons purchased by the logged in customer(condition was checked in getCustomerCoupons())  customer filtered
     * by max price.
     * If not logged in, returns null.
     * "filter(coupon -> coupon.getPrice()<=maxPrice)" will do the same as running for loop.
     * @return List of coupons purchased by the customer.
     */
    public List<Coupon> getCustomerCoupons(double maxPrice) {
        return getCustomerCoupons().stream().
                filter(coupon -> coupon.getPrice()<=maxPrice).
                collect(Collectors.toList());
    }

    /**
     * Get all details from logged in customer.
     *
     * @return this.Customer details if logged in, else returns null.
     */
    public Customer getCustomerDetails() {
        if (loggedIn) {
            return customer;
        }
        return null;
    }
}
