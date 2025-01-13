package com.example.Benny_Bach_Coupons_Project_SpringV.services;


import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.CustomersVsCoupons;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class AdminService extends ClientService {

    public AdminService() {
    }

    /**
     * Admin Login.
     *
     * @param email    Admmin's Email
     * @param password Admmin's Password
     * @return if params equals correct credentials will return true , if not will return false.
     */
    @Override
    public boolean login(String email, String password) {
        return email.equals("admin@admin.com") && password.equals("admin");
    }

    /**
     * Adds new company to data base , checking through repository if company exist by email or name.
     * If not exist company will be added .
     *
     * @param company new company to add to data base.
     * @throws SQLException if the new company to add found by email or name in data base throw's Exception.
     */
    public void addCompany(Company company) throws SQLException {
        if (companyRepository.existsByName(company.getName()) ||
                companyRepository.existsByEmail(company.getEmail())) {
            throw new SQLException("Sorry this companies name or email already exist ,cannot add the company");
        } else {
            companyRepository.save(company);
        }
    }

    /**
     * Update existing company's password or email (Name or ID cannot be modified).
     * First condition is to find if the company provided exist in data base by ID ,
     * if found the company from the data base will be pooled as is to compare changes between updated version and original one from date base,
     * if not found throw's new SQLException.
     * <p>
     * Second condition is to check if original name was not changed , if not changed company will be updated,
     * if try to update name throws new SQLException.
     *
     * @param company updated version on existing company.
     * @throws SQLException if company to update was not found , else if try to change company's name.
     */
    public void updateCompany(Company company) throws SQLException {
        Company temp = companyRepository.findById(company.getId()).orElseThrow(() -> new SQLException("Company not found with ID: " + company.getId()));
        if (temp.getName().equals(company.getName())) {
            if(companyRepository.existsByEmail(company.getEmail())){
                if(!temp.getEmail().equals(company.getEmail())){
                    throw new SQLException("This email already existed under different company name");
                }
            }
            if(!company.getEmail().equals("")){
                temp.setEmail(company.getEmail());
            }
            if (!company.getPassword().equals("")){
                temp.setPassword(company.getPassword());
            }
            companyRepository.save(temp);
        } else {
            throw new SQLException("Sorry name of existed company cannot be updated");
        }
    }

    /**
     * Delete company by id.
     * First condition is to find if the company provided exist in data base by ID.
     * <p>
     * if not found throw's new SQLException,
     * If found company will be pulled from data base to "temp" as company object,
     * Later for loop will run on each coupon that belongs to "temp" to get coupon id,
     * each coupon will be added to CustomersVsCoupons which holds purchase history
     * if coupon "c".getId exist in CustomersVsCoupons table.
     * if "c" exist in CustomersVsCoupons table a loop will remove each transaction of
     * "c". once finished company will be deleted including all coupons belonging to company by JPA.
     *
     * @param companyId ID of the company to delete.
     * @throws SQLException if company not found by id .
     */
    public void deleteCompany(int companyId) throws SQLException {
        Company temp = companyRepository.findById(companyId).orElseThrow(() -> new SQLException("Company not found with ID: " + companyId));
        for (Coupon c : temp.getCoupons()) {
            List<CustomersVsCoupons> purchaseHistory = customerVsCouponsRepo.findByCouponId(c.getId());
            for (CustomersVsCoupons cVc : purchaseHistory) {
                customerVsCouponsRepo.deleteById(cVc.getTransactionId());
            }
        }
        companyRepository.deleteById(companyId);
    }

    /**
     * pull all companies from date base.
     *
     * @return all companies from date base.
     */
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /**
     * Get one company by id.
     *
     * @param companyId ID of the company.
     * @return one company found under id.
     * @throws SQLException if company not found by id.
     */
    public Company getOneCompany(int companyId) throws SQLException {
        return companyRepository.findById(companyId).orElseThrow(() -> new SQLException("Company not found with ID: " + companyId));
    }

    /**
     * Add new customer in not exist by email in data base.
     *
     * @param customer new customer object to add.
     * @throws SQLException if customer already exist by email.
     */
    public void addCustomer(Customer customer) throws SQLException {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new SQLException("This email " + customer.getEmail() + " already exist");
        } else {
            customerRepository.save(customer);
        }
    }

    /**
     * update existing customer if found(id cannot be modified).
     * if found customer will be pulled to "temp" in order to prevent any id changes , since creating new customer can get "ID" upon creation.
     * once pulled to "temp" temp will get all new changes from "customer" and will be updated.
     *
     * @param customer updated version of customer.
     * @throws SQLException if customer not found by id.
     */
    public void updateCustomer(Customer customer) throws SQLException {
        Customer temp = customerRepository.findById(customer.getId()).orElseThrow(() -> new SQLException("Customer not found with ID: " + customer.getId()));
        if(customerRepository.existsByEmail(customer.getEmail())){
            if(!temp.getEmail().equals(customer.getEmail())){
                throw new SQLException("Email cannot be updated another customer already exist with email: "+customer.getEmail());
            }
        }
        if(!customer.getEmail().equals("")){
            temp.setEmail(customer.getEmail());
        }
        if(!customer.getFirstName().equals("")){
            temp.setFirstName(customer.getFirstName());
        }
        if(!customer.getLastName().equals("")){
            temp.setLastName(customer.getLastName());
        }
        if(!customer.getPassword().equals("")){
            temp.setPassword(customer.getPassword());
        }
        customerRepository.save(temp);
    }

    /**
     * Delete Customer .
     * If customer not found by id SQLException.
     * if found customer will be pulled by id to "temp".
     * all customer purchase history will be pulled to a list of CustomersVsCoupons by customer id.
     * CustomersVsCoupons holds all transaction history made by the customer to be deleted.
     * each transaction will be deleted from purchase history.
     * finally customer will be deleted once purchase history is clear.
     *
     * @param customerId id of the customer to be deleted.
     * @throws SQLException if customer not found by id.
     */
    public void deleteCustomer(int customerId) throws SQLException {
        Customer temp = customerRepository.findById(customerId).orElseThrow(() -> new SQLException("Customer not found with ID: " + customerId));
        List<CustomersVsCoupons> cVc = customerVsCouponsRepo.findByCustomerId(temp.getId());
        for (CustomersVsCoupons c : cVc) {
            customerVsCouponsRepo.deleteById(c.getTransactionId());
        }
        customerRepository.deleteById(temp.getId());
    }

    /**
     * Get all customers from data base.
     *
     * @return all customers from data base.
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Get one customer by id if found.
     *
     * @param customerId ID of the customer.
     * @return Customer object from data base.
     * @throws SQLException if customer not found by id .
     */
    public Customer getOneCustomer(int customerId) throws SQLException {
        return customerRepository.findById(customerId).orElseThrow(() -> new SQLException("Customer not found with ID: " + customerId));
    }

    public int totalSold(){
        return customerVsCouponsRepo.findAll().size();
    }





}





