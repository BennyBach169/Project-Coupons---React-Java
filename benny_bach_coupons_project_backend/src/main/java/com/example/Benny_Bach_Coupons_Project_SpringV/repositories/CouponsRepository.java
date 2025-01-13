package com.example.Benny_Bach_Coupons_Project_SpringV.repositories;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Category;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface CouponsRepository extends JpaRepository<Coupon,Integer> {

    /**
     * Deletes a coupon from the database based on its ID.
     *The default method from JPA "deleteById" was not working properly , and this is why used the custom method.
     *
     * @NativeQuery = true ... used here since JPA had issues deleting coupon by ID ,therefor executing direct code to delete from data base.
     * if set to false , JPA will manage the query. if set to true it will directly execute the code in data base.
     *
     *The @Transactional annotation ensures that the delete operation for the coupon ,
     *will either fully succeed or fully fail as part of a single transaction. If fail no changes will be in data base.
     *
     * @Modifying annotation  is essential when  executing INSERT, UPDATE, or DELETE , if not used JPA will assume this method performing a read only operation.
     *
     * @param couponId The ID of the coupon to be deleted.
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM coupons WHERE id = :couponId", nativeQuery = true)
    void deleteCouponById(@Param("couponId") int couponId);

    /**
     * Find coupons of 1 company
     * @param companyId ID of the company.
     * @return all coupons created by company provided.
     */
    List<Coupon> findByCompanyId(int companyId);
    /**
     * Find coupons under specific category type of 1 company.
     * @param category category type to find
     * @param companyId ID of the company.
     * @return all coupons created by company provided filtered by category provided.
     */
    List<Coupon> findByCategoryAndCompanyId(Category category, int companyId);

    /**
     * Find coupons up to specific price of 1 company.
     * @param maxPrice max price of coupons to return.
     * @param companyId ID of the company.
     * @return all coupons created by company provided filtered by max price(including max price).
     */
    List<Coupon> findByPriceLessThanEqualAndCompanyId(double maxPrice, int companyId);

    /**
     * Check if specific coupon's end date is before current date (if coupon expired).
     * @param couponId ID of coupon to check.
     * @param currentDate Current date to check condition.
     * @return if end date is before current date of coupon provided return's true , else false .
     */
    boolean existsByIdAndEndDateBefore(int couponId, Date currentDate);
    /**
     * Check if specific coupon's start date is after current date (if coupon not started yet).
     * @param couponId ID of coupon to check.
     * @param currentDate Current date to check condition.
     * @return if start date is after current date of coupon provided return's true , else false .
     */
    boolean existsByIdAndStartDateAfter(int couponId, Date currentDate);
    List<Coupon> findByEndDateBefore(Date currentDate);

}
