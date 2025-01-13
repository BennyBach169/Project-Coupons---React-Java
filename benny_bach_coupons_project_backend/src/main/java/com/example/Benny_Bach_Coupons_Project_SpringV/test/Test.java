package com.example.Benny_Bach_Coupons_Project_SpringV.test;

import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.ClientType;
import com.example.Benny_Bach_Coupons_Project_SpringV.Client_Logins.LoginManager;
import com.example.Benny_Bach_Coupons_Project_SpringV.Threads.Job;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Customer;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Company;
import com.example.Benny_Bach_Coupons_Project_SpringV.beans.Coupon;
import com.example.Benny_Bach_Coupons_Project_SpringV.repositories.CompanyRepository;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.AdminService;
import com.example.Benny_Bach_Coupons_Project_SpringV.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.List;

@Component
public class Test {
    @Autowired
    private LoginManager loginManager;
    @Autowired
    private RandomObjects randomObjects;
    @Autowired
    private Job job;

    public Test() {
    }

    public void testAll() throws SQLException, InterruptedException {

        AdminService adminService = (AdminService) loginManager.login(ClientType.ADMINISTRATOR, "admin@admin.com", "admin");
        //AdminService
        {
            //Company methods
            {

                //Block 1 : get 1 company , getAllCompanies , addCompany
                {
//            printCompaniesLikeABoss(adminService.getAllCompanies());
//            Company temp = new Company("HP", "HP@GMAIL.COM", "0000", null);
//            adminService.addCompany(temp);
//            printCompaniesLikeABoss(adminService.getAllCompanies());
////        adminService.addCompany(new Company("HP","00","0000",null));
////        adminService.addCompany(new Company("00","HP@GMAIL.COM","0000",null));
//            System.out.println(adminService.getOneCompany(21));
                }

                //Block 2 : updateCompany
                {
//            Company temp2 = adminService.getOneCompany(20);
//            System.out.println(temp2);
//
////        temp2.setName("ABC");
////        adminService.updateCompany(temp2);
//
////        temp2.setEmail("ABC");
////        temp2.setPassword("ABC");
////        adminService.updateCompany(temp2);
//            System.out.println(adminService.getOneCompany(20));
                }

                //Block 3: deleteCompany
                {
////            for (int i = 0; i < 10; i++) {
////                adminService.addCustomer(randomObjects.getRandCustomer());
////            }
//            Company temp3 = adminService.getOneCompany(19);
//            CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, temp3.getEmail(), temp3.getPassword());
////            for (int i = 0; i < 10; i++) {
////                companyService.addCoupon(randomObjects.getRandCoupon(temp3));
////            }
////            for (Coupon c : temp3.getCoupons()) {
////                for (Customer cu: adminService.getAllCustomers()){
////                    CustomerService customerService = (CustomerService) loginManager.login(ClientType.CUSTOMER, cu.getEmail(), cu.getPassword());
////                    customerService.purchaseCoupon(c);
////                }
////            }
//            adminService.deleteCompany(temp3.getId());
                }
            }

            //Customer Methods
            {

                //Block 1 : getOnCustomer , getAllCustomers , addCustomer
                {
//                    printCustomersLikeABoss(adminService.getAllCustomers());
//                    System.out.println(adminService.getOneCustomer(10));
//                    Customer temp = new Customer("Avi","Cohen","AviCohen@Gmail.com","1234");
//                    adminService.addCustomer(temp);
//                    Customer temp2 = new Customer("Yossi","Cohen","AviCohen@Gmail.com","1234");
//                    adminService.addCustomer(temp2);
                }

                //Block 2 : updateCustomer
                {
//                    Customer temp2 = adminService.getOneCustomer(10);
//                    System.out.println(temp2);
//                    temp2.setPassword("pas");
//                    temp2.setEmail("mail");
//                    temp2.setFirstName("first");
//                    temp2.setLastName("last");
//                    adminService.updateCustomer(temp2);
//                    System.out.println(temp2);
                }

                // Block 3 : deleteCustomer 😱😱😱🤯🤯🤯
                {
//                    Customer temp3 = adminService.getOneCustomer(10);
//                    CustomerService customerService = (CustomerService) loginManager.login(ClientType.CUSTOMER, temp3.getEmail(), temp3.getPassword());
//
////                    for(Company c:adminService.getAllCompanies()){
////                        CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY,c.getEmail(),c.getPassword());
////                        companyService.addCoupon(randomObjects.getRandCoupon(c));
////                        for (Coupon cou: adminService.getOneCompany(c.getId()).getCoupons()){
////                            customerService.purchaseCoupon(cou);
////                        }
////                    }
//                    adminService.deleteCustomer(temp3.getId());
                }
            }

        }

        //CompanyService
        {
            //Block 1: add data for test , getAllCouponsMethods , getCompanyDetails
            {
//                Company temp = adminService.getOneCompany(18);
//                CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY,temp.getEmail(),temp.getPassword());
//                System.out.println(companyService.getCompanyDetails());
////                for (int i = 0; i < 25; i++) {
////                    companyService.addCoupon(randomObjects.getRandCoupon(temp));
////                }
////                printCouponsLikeABoss(companyService.getCompanyCoupons());
////                printCouponsLikeABoss(companyService.getCompanyCoupons(Category.FOOD));
////                printCouponsLikeABoss(companyService.getCompanyCoupons(105.99));
            }

            //Block 2: AddCoupon
            {
//                Company temp = adminService.getOneCompany(18);
//                CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, temp.getEmail(), temp.getPassword());
//                Coupon coupon = new Coupon(temp,Category.FOOD,"test","descripiton",
//                        Date.valueOf(LocalDate.now()),Date.valueOf(LocalDate.now()),10,50,"image");
//                companyService.addCoupon(coupon);
//                System.out.println(companyService.getCompanyCoupons(50));
//                companyService.addCoupon(coupon);
////                Company temp2 = adminService.getOneCompany(17);
////                CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, temp2.getEmail(), temp2.getPassword());
////                Coupon coupon2 = new Coupon(temp2,Category.FOOD,"test","descripiton",
////                        Date.valueOf(LocalDate.now()),Date.valueOf(LocalDate.now()),10,50,"image");
////                companyService.addCoupon(coupon2);
            }

            //Block 3: updateCoupon
            {
//                Company temp = adminService.getOneCompany(18);
//                CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, temp.getEmail(), temp.getPassword());
//                Coupon c = companyService.getCompanyCoupons().get(0);
//                System.out.println(c);
////                c.setAmount(1);
////                c.setImage("1");
////                c.setPrice(1);
////                c.setStartDate(null);
////                c.setEndDate(null);
////                c.setCategory(Category.CINEMA);
////                c.setTitle("1");
////                c.setDescription("1");
////                companyService.updateCoupon(c);
////                System.out.println(c);
            }

            //Block 4: deleteCoupon
            {
//                Company temp = adminService.getOneCompany(18);
//                CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, temp.getEmail(), temp.getPassword());
//                Coupon c = companyService.getCompanyCoupons().get(0);
////                for(Customer cust:adminService.getAllCustomers()){
////                    CustomerService customerService = (CustomerService) loginManager.login(ClientType.CUSTOMER,cust.getEmail(), cust.getPassword());
////                    customerService.purchaseCoupon(c);
////                }
//                companyService.deleteCoupon(c.getId());
            }

        }

        //CustomerService
        {
            //Block 1: Purchase Coupon
            {
//                Company company = adminService.getOneCompany(18);
//                CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, company.getEmail(), company.getPassword());
//                Coupon coupon = companyService.getCompanyCoupons().get(0);
//
//                Customer customer = adminService.getOneCustomer(9);
//                CustomerService customerService = (CustomerService) loginManager.login(ClientType.CUSTOMER, customer.getEmail(), customer.getPassword());
//
//                //Check expired or not started yet
////                Date startDate = Date.valueOf(LocalDate.of(2024,9,20));
////                Date endDate = Date.valueOf(LocalDate.of(2024,10,20));
////                coupon.setStartDate(startDate);
////                coupon.setEndDate(endDate);
////                companyService.updateCoupon(coupon);
////                customerService.purchaseCoupon(coupon);
//
//                //Check if amount is 0 or less if(less) setAmount wont work :)
////                coupon.setAmount(0);
////                companyService.updateCoupon(coupon);
////                customerService.purchaseCoupon(coupon);
//
//                //Check if coupon can be purchased by Customer twice
////                coupon.setAmount(2);
////                companyService.updateCoupon(coupon);
////                customerService.purchaseCoupon(coupon);

            }

            //Block 2: GetAllPurchased coupons methods
            {
//                Customer customer =adminService.getOneCustomer(13);
//                CustomerService customerService =(CustomerService) loginManager.login(ClientType.CUSTOMER, customer.getEmail(),customer.getPassword());
//
////                //addData
////                List<Coupon> couponsToPurchase = new ArrayList<>();
////                for(Company c:adminService.getAllCompanies()){
////                    couponsToPurchase.addAll(c.getCoupons());
////                }
////                for (Coupon co:couponsToPurchase){
////                    customerService.purchaseCoupon(co);
////                }
//
////                printCouponsLikeABoss(customerService.getCustomerCoupons());
////                printCouponsLikeABoss(customerService.getCustomerCoupons(100));
////                printCouponsLikeABoss(customerService.getCustomerCoupons(Category.CINEMA));
            }
        }

        //Job Test
        {
//            job.Start();
//            Thread.sleep(1000*15);
//            job.Stop();c.
        }


//       Company c = adminService.getOneCompany(18);
//        CompanyService companyService = (CompanyService) loginManager.login(ClientType.COMPANY, c.getEmail(), c.getPassword());
//            for (int i = 0; i < 3; i++) {
//                companyService.addCoupon(randomObjects.getRandCoupon(c));
//
//        }




    }


    private static void printCustomersLikeABoss(List<Customer> customers) {
        for (Customer c : customers) {
            System.out.println();
            System.out.println("Id:" + c.getId() + " | Full Name:" + c.getFirstName() + " " + c.getLastName() + " | Email:" + c.getEmail() +
                    " | Password(Shown only for test) :" +
                    c.getPassword());
            System.out.println();
            System.out.println("\"" + c.getFirstName() + " " + c.getLastName() + "\" Coupons:");
            System.out.println();
            System.out.println("-----------------------------------------------------------------------------------------");
        }

    }

    private static void printCompaniesLikeABoss(List<Company> companies) {
        System.out.println();
        for (Company c : companies) {
            System.out.println("Id:" + c.getId() + " | Name:" + c.getName() + " | Email:" + c.getEmail() +
                    " | Password(Shown only for test) :" +
                    c.getPassword());
            System.out.println();
            System.out.println("\"" + c.getName() + "'s\" Coupons:");
            System.out.println();
            System.out.println("-----------------------------------------------------------------------------------------");


        }
    }

    private static void printCouponsLikeABoss(List<Coupon> coupons) {
        for (Coupon coupon : coupons) {
            System.out.println("Company: " + coupon.getCompany());
            System.out.println("Id: " + coupon.getId() + " | Category: " + coupon.getCategory() + " | Title: " + coupon.getTitle() + " | Description: " +
                    coupon.getDescription() + " | Start Date: " + coupon.getStartDate() + " | End Date: " + coupon.getEndDate() +
                    " | Price: " + coupon.getPrice() + " | Amount: " + coupon.getAmount() + " | Image: " + coupon.getImage());
            System.out.println("--------------------------------------------------------------------------------------------------------------------");
            System.out.println();
        }
    }

    private static void printCompanyLikeABoss(Company company) {
        System.out.println();
        System.out.println("Id:" + company.getId() + " | Name:" + company.getName() + " | Email:" + company.getEmail() +
                " | Password(Shown only for test) :" +
                company.getPassword());
        System.out.println();
        System.out.println("\"" + company.getName() + "'s\" Coupons:");
        System.out.println();
        printCouponsLikeABoss(company.getCoupons());
        System.out.println("-----------------------------------------------------------------------------------------");
    }


}
