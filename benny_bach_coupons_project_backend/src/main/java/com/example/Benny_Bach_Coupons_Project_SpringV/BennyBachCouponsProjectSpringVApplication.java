package com.example.Benny_Bach_Coupons_Project_SpringV;

import com.example.Benny_Bach_Coupons_Project_SpringV.Threads.Job;
import com.example.Benny_Bach_Coupons_Project_SpringV.test.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.SQLException;

@SpringBootApplication
@EnableScheduling
public class BennyBachCouponsProjectSpringVApplication {

    public static void main(String[] args) {
       ApplicationContext ctx = SpringApplication.run(BennyBachCouponsProjectSpringVApplication.class, args);

        Job job = ctx.getBean(Job.class);
        job.Start();
    }
}
