package com.example.Benny_Bach_Coupons_Project_SpringV.repositories;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    /**
     * Check if Customer exist by email.
     * @param email email of the customer to find.
     * @return if email provided was found in data base will return true, else false.
     */
    boolean existsByEmail(String email);

    /**
     * Check if Customer exist by email and password in Data Base for login.
     * @param password Customer's password.
     * @param email Customer's email.
     * @return if email and password match in one row in Data Base will return true, else false.
     */
    boolean existsByPasswordAndEmail(String password,String email);

    /**
     * Find Customer by email.
     * @param email email of the customer to find.
     * @return if found in data base return's the customer as object.
     */
    Customer findByEmail(String email);
}
