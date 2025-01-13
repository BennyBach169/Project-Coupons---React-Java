package com.example.Benny_Bach_Coupons_Project_SpringV.repositories;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Integer> {
    /**
     * Check if Company exist by name in Data Base.
     * @param name name of the company
     * @return if exist return true, else false.
     */
    boolean existsByName(String name);

    /**
     * Check if Company exist by email in Data Base.
     * @param email email of the company
     * @return if exist return true, else false.
     */
    boolean existsByEmail(String email);

    /**
     * Check if Company exist by email and password in Data Base for login.
     * @param password company's password.
     * @param email company's email.
     * @return if email and password match in one row in Data Base will return true, else false.
     */
    boolean existsByPasswordAndEmail(String password,String email);

    /**
     * Find Company  by email in Data Base.
     * @param email email to find Company
     * @return if company found by email return's the company object.
     */
    Company findByEmail(String email);

}
