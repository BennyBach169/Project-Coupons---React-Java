package com.example.Benny_Bach_Coupons_Project_SpringV.beans;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "company_id")
//    @JsonManagedReference
    private Company company;
    @Enumerated(EnumType.ORDINAL)
    @JoinColumn(name = "category_id")
    private Category category;
    private String title,description;
    private Date startDate,endDate;
    private int amount;
    private double price;
    private String image;

    public Coupon() {
    }

    public Coupon(int id, Company company, Category category, String title,
                  String description, Date startDate, Date endDate, int amount, double price, String image) throws SQLException {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    public Coupon(Company company, Category category, String title, String description,
                  Date startDate, Date endDate, int amount, double price, String image) throws SQLException {
        if(amount < 0){
            throw new SQLException("Sorry this coupon cannot be created amount is lees then 0");
        }validateDates(startDate,endDate);
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    public int getId() {
        return id;
    }


    public Company getCompany() {
        return company;
    }


    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) throws SQLException {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) throws SQLException {
        validateDates(this.startDate,endDate);
        this.endDate = endDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) throws SQLException {
        if(amount < 0){
            throw new SQLException("Sorry this coupon cannot be modified amount is less then 0");
        }
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) throws SQLException {
        if(price <= 0){
            throw new SQLException("Sorry this coupon cannot be modified price is less then 0");
        }
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", companyId=" + company +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", price=" + price +
                ", image='" + image + '\'' +
                "" +
                "}\n";
    }

    private static void validateDates(Date startDate,Date endDate ) throws SQLException {
        if(startDate.after(endDate)){
            throw new SQLException("Sorry problem with coupon Start Date "+startDate+" Is after End Date "+endDate);
        }
    }
}
