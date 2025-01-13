package com.example.Benny_Bach_Coupons_Project_SpringV.services;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
public class CompanyService extends ClientService {
    private boolean loggedIn = false;
    private Company company;

    /**
     * Company login using email and password.
     * First, checks if the provided email and password exist in the database.
     * If exists, loggedIn will be set to true , and Company will be pulled to the class
     * for later use, finally method will return true for Login Manager.
     *
     * @param email Company's email.
     * @param password Company's password.
     * @return true if login is successful, else throws SQLException.
     * @throws SQLException if email and password not exist in one row.
     */
    @Override
    public boolean login(String email, String password) throws SQLException {
        if (companyRepository.existsByPasswordAndEmail(password, email)) {
            this.company = companyRepository.findByEmail(email);
            this.loggedIn = true;
            return true;
        } else {
            throw new SQLException("Login failed one or two of details provided are incorrect");
        }
    }

    /**
     * Adds a new coupon to the database if the company is logged in.
     * If logged in company will be pulled to the class.
     * For loop on each coupon crated by logged in company ,
     * if the coupon's provided title match any of company's coupons
     * will set found to true (lower case used just for extra security).
     *
     * if not found new coupon will be saved.
     *
     * @param coupon New coupon to add.
     * @throws SQLException if the coupon title already exists under the company's account.
     */
    public void addCoupon(Coupon coupon ) throws SQLException {
        if (loggedIn) {
            checkForNulls(coupon);
            boolean found = checkForTitleDup((coupon));
            if (!found) {
                couponsRepository.save(coupon);
            } else {
                throw new SQLException("This Coupon title already exist under " + company.getName() + " account");
            }
        }
    }


    /**
     * Updates an existing coupon with the provided details(Not including coupon ID and company ID).
     *
     * Checks if the company is logged in. If logged in, coupon will be pulled to "temp"
     * from the database using the provided coupon.getId(). If the coupon is not found, a SQLException is thrown.
     * If coupon to update found checks if coupon belongs to logged in company,
     * If true "temp" will be modified and saved in "DB".
     *
     * @param coupon The updated coupon object containing new details.
     * @throws SQLException If the coupon is not found,
     *         or if the coupon does not belong to the logged-in company.
     */
    public void updateCoupon(Coupon coupon) throws SQLException {
        if (loggedIn) {
            checkForNulls(coupon);
            Coupon temp = couponsRepository.findById(coupon.getId()).orElseThrow(() -> new SQLException("Coupon not found with ID: " + coupon.getId()));
            if (temp.getCompany().getId() == company.getId()) {
                boolean found = checkForTitleDup((coupon));
                if (!found || temp.getTitle().toLowerCase().equals(coupon.getTitle().toLowerCase())) {
                    temp.setTitle(coupon.getTitle());
                    temp.setAmount(coupon.getAmount());
                    temp.setCategory(coupon.getCategory());
                    temp.setDescription(coupon.getDescription());
                    temp.setStartDate(coupon.getStartDate());
                    temp.setEndDate(coupon.getEndDate());
                    temp.setPrice(coupon.getPrice());
                    temp.setImage(coupon.getImage());
                    couponsRepository.save(temp);
                } else {
                    throw new SQLException("This Coupon title already exist under " + company.getName() + " account");
                }

            }
        }
    }

    /**
     * Delete company by id.
     * Checks if the company is logged in. If logged in, coupon will be pulled to "temp"
     * from the database using the provided couponId. If the coupon is not found, a SQLException is thrown.
     *
     * Later for loop will run on each coupon that belongs to logged in company to get coupon id,
     * if couponId provided equals any of the coupons belonging to company
     * "found" boolean will set to true.
     *
     * if found CustomersVsCoupons holds all purchase history of the coupon by coupon Id,
     * all purchase history of coupon pulled to list "cVc".
     * for loop will run on each transaction and deletes it.
     * finally once all history is clear coupon will be deleted.
     *
     *
     * @param couponId ID of the coupon to delete.
     * @throws SQLException if coupon not found by id .
     */
    public void deleteCoupon(int couponId) throws SQLException {
        if (loggedIn) {
            List<Coupon> coupons = couponsRepository.findByCompanyId(company.getId());
            boolean found = false;
            Coupon temp = couponsRepository.findById(couponId).orElseThrow(() -> new SQLException("Coupon not found with ID: " + couponId));
            for (Coupon c : coupons) {
                if (couponId == c.getId()) {
                    found = true;
                }
            }
            if (found) {
                List<CustomersVsCoupons> cVc = customerVsCouponsRepo.findByCouponId(temp.getId());
                for (CustomersVsCoupons c : cVc) {
                    customerVsCouponsRepo.deleteById(c.getTransactionId());
                }
                couponsRepository.deleteCouponById(temp.getId());
            }
        }
    }

    /**
     * Gets all coupons created by the logged in company.
     * If not logged in, returns null.
     *
     * @return List of coupons created by the company.
     */
    public List<Coupon> getCompanyCoupons() {
        if (loggedIn) {
            return couponsRepository.findByCompanyId(company.getId());
        }
        return null;
    }


    /**
     * Gets all coupons created by the logged in company filtered by specific category.
     * If not logged in, returns null.
     * "findByCategoryAndCompanyId" holds its own java docs :).
     *
     * @param category category type to use as filter.
     * @return List of coupons created by the company filtered by specific category type.
     */
    public List<Coupon> getCompanyCoupons(Category category) {
        if (loggedIn) {
            return couponsRepository.findByCategoryAndCompanyId(category, company.getId());
        }
        return null;
    }

    /**
     * Gets all coupons created by the logged in company filtered by max price.
     * If not logged in, returns null.
     * "findByPriceLessThanEqualAndCompanyId" holds its own java docs :).
     *
     * @param maxPrice max price to use as filter.
     * @return List of coupons created by the company filtered by max price.
     */
    public List<Coupon> getCompanyCoupons(double maxPrice) {
        if (loggedIn) {
            return couponsRepository.findByPriceLessThanEqualAndCompanyId(maxPrice, company.getId());
        }
        return null;
    }

    /**
     * Get all details from logged in company.
     *
     *   בפרויקט מבקשים מאיתנו שזה יחזיר אובייקט
     *   הבעיה בזה שנותן גישה למשתנים של האוביקייט וככה בעצם יש גישה לעשות שינויים
     *   על החברה למרות שרק דרך אמדין אפשר לעשות שינויים לפי איך שזה בנוי
     *בעיניי זה אמור להחזיר סטרינג.
     *
     * @return this.company details if logged in, else returns null.
     */
    public Company getCompanyDetails(){
        if (loggedIn){
            return company;
        }
        return null;
    }

    public int totalSold(){
        List<CustomersVsCoupons> sold = new ArrayList<>();
        if (loggedIn) {
            for (Coupon c : couponsRepository.findByCompanyId(company.getId())) {
                for (CustomersVsCoupons cVc : customerVsCouponsRepo.findByCouponId(c.getId())) {
                    sold.add(cVc);
                }
            }
        }
        return sold.size();
    }

    public boolean checkForTitleDup(Coupon  coupon){
        List<Coupon> coupons = couponsRepository.findByCompanyId(company.getId());
        for (Coupon c : coupons) {
            if (c.getTitle().toLowerCase().equals(coupon.getTitle().toLowerCase())) {
                return true;
            }
        }return false;
    }

    public void checkForNulls (Coupon coupon) throws SQLException {
        if(coupon.getTitle().equals("") || coupon.getTitle() == null){
            throw new SQLException("Coupons title cannot be empty");
        } else if (coupon.getCategory().equals("") || coupon.getCategory() == null) {
            throw new SQLException("Coupons category cannot be empty");
        }
    }


}
