package com.example.Benny_Bach_Coupons_Project_SpringV.Threads;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.CustomersVsCoupons;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CouponsRepository;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CustomerVsCouponsRepo;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;

@Component
public class Job implements Runnable {
    @Autowired
    private CouponsRepository couponsRepository;
    @Autowired
    private CustomerVsCouponsRepo customerVsCouponsRepo;
    boolean quit = false;
    private Thread thread;

    public Job() throws SQLException {
    }

    //initializing the job runnable
    //start calls run();
    public void Start() {
        this.thread = new Thread(this);
        thread.start();
    }


    //while not interrupted by this.thread , pulling all coupons from data
    //checks if end date is before now if true deletes all coupon purchase
    //history and coupon itself.
    //later sleeps for 24H
    @Override
    public void run() {
        try {
            while (!quit) {
                for (Coupon c : couponsRepository.findAll()) {
                    if (couponsRepository.existsByIdAndEndDateBefore(c.getId(),Date.valueOf(LocalDate.now()))) {
                        for (CustomersVsCoupons cVc:customerVsCouponsRepo.findByCouponId(c.getId())){
                            customerVsCouponsRepo.delete(cVc);
                        }
                        couponsRepository.deleteCouponById(c.getId());
                    }
                }
                Thread.sleep(get24HinMillis());
            }
        } catch (InterruptedException e) {
            System.out.println("Job Stopped ");
        }
    }

    //sets quit to ture to stop the loop of run();
    //making this thread interpret sleeping threads to check loop condition now.
    public  void Stop() throws InterruptedException {
        quit = true;
        if(thread != null){
            thread.interrupt();
        }else {
            System.out.println("Thread is null");
        }
    }

    //returns 24 hours in millis.
    private long get24HinMillis(){
        long second = 1000;
        long minute = second*60;
        long hour = 60 * minute;
        return 24 * hour;
    }


}
