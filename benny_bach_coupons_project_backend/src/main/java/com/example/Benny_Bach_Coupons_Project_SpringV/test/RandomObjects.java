package com.example.Benny_Bach_Coupons_Project_SpringV.test;

import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Category;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Random;

@Component
public class RandomObjects {
    private final Random random;
    private static RandomObjects randomObjects;

    private String[] customerNames = {"aaron", "abigail", "adam", "alex", "amanda", "andrew", "angela", "anthony", "ashley", "ben", "brandon", "brittany", "caitlin", "cameron", "carol", "charles", "chelsea", "christopher", "daniel", "david", "elizabeth", "ella", "emily", "ethan", "grace", "hailey", "isaac", "james", "jason", "jessica", "john", "joseph", "justin", "katherine", "kevin", "laura", "lily", "madison", "michael", "moses", "nicole", "olivia", "ryan", "sarah", "sophia", "stephen", "taylor", "victoria", "william"};

    private String[] companyNames = {"apple", "google", "microsoft", "amazon", "facebook", "tesla", "berkshire hathaway", "coca-cola", "exxon mobil", "walmart", "pepsi", "nike", "visa", "intel", "ibm", "oracle", "adobe", "samsung", "dell", "bp", "unilever", "jd.com", "salesforce", "paypal", "moderna"};

    private String[] titles = {
            "Super Saver Deal", "Exclusive Summer Offer", "Buy One Get One Free",
            "Weekend Special", "Flash Sale", "Limited Time Discount", "Holiday Promotion",
            "End of Season Sale", "Mega Clearance", "Special Member Offer", "Bundle and Save",
            "Grand Opening Deal", "Limited Edition Release", "Early Bird Special",
            "Clearance Blowout", "VIP Access Only", "Free Gift with Purchase",
            "Secret Sale", "Anniversary Special", "Back to School Offer", "Festival of Savings",
            "Ultimate Shopping Spree", "Happy Hour Discounts", "Online Exclusive Deal", "Last-Minute Offer"
    };

    private String[] descriptions = {
            "Get ready to save big with our exclusive offer available for a limited time only.",
            "Don’t miss out on this fantastic deal - valid while supplies last!",
            "Enjoy incredible savings with our special promotion this weekend.",
            "Shop now and take advantage of our amazing discounts on selected items.",
            "Celebrate the holidays with unbeatable offers and festive joy!",
            "Stock up and save with our end-of-season clearance sale.",
            "Discover the ultimate discounts on your favorite products.",
            "Upgrade your wardrobe with our grand opening sale - shop today!",
            "Get an extra special treat when you purchase during our promotional period.",
            "Save more with our VIP access event - exclusive to members only.",
            "Bundle your favorites and enjoy huge savings across the store.",
            "Shop now to claim your free gift with every eligible purchase.",
            "Unveil the secret sale for extraordinary deals you won’t find anywhere else.",
            "Celebrate our anniversary with discounts that will make you smile.",
            "Get ready for back-to-school season with essential savings on supplies.",
            "Indulge in our festival of savings - a shopping event like no other!",
            "Take advantage of our happy hour discounts and treat yourself.",
            "Enjoy the thrill of online-exclusive deals from the comfort of your home.",
            "Make the most of our last-minute offer before time runs out!"
    };

    public RandomObjects() {
        this.random = new Random();
    }

    public Company getRandCompany() {
        return new Company(getRandCompanyName(), getRandCompanyName() + "@gmail.com", "" + random.nextInt(8000), null);
    }

    private String getRandCustomerName() {
        return customerNames[random.nextInt(customerNames.length)];
    }

    private String getRandCompanyName() {
        return companyNames[random.nextInt(companyNames.length)];
    }

    public Customer getRandCustomer() {
        return new Customer(getRandCustomerName(), getRandCustomerName(), getRandCustomerName() + "@gmail.com",""+ random.nextInt(8000));
    }

    public Date getRandStartDate() {
        int day = random.nextInt(1, 28);
        int month = random.nextInt(1, 7);
        int year = random.nextInt(2022, 2026);
        return Date.valueOf(LocalDate.of(year, month, day));
    }

    public Date getRandEndDate() {
        int day = random.nextInt(1, 28);
        int month = random.nextInt(1, 13);
        int year = random.nextInt(2024, 2026);
        return Date.valueOf(LocalDate.of(year, month, day));
    }

    public String getRandTitle() {
        return titles[random.nextInt(titles.length)];
    }

    public String getRandDescription() {
        return descriptions[random.nextInt(descriptions.length)];
    }

    public Coupon getRandCoupon(Company company) throws SQLException {
        return new Coupon(company, Category.values()[random.nextInt(Category.values().length)], getRandTitle(), getRandDescription(), getRandStartDate(),
                getRandEndDate(), random.nextInt(20,100), random.nextDouble(1000.00), "This is only practice");
    }
}

