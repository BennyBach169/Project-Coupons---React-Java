import axios from "axios";
import { Company } from "../models/Company";
import { Customer } from "../models/Customer";

class AdminService {
    async getAllCompanies(token: string) {
        return (await axios.get<Company[]>("http://localhost:8080/admin/companies", { headers: { Authorization: "Bearer " + token } })).data;
    }

    async getOneCompany(token: string, id: number) {
        return (await axios.get<Company>(`http://localhost:8080/admin/getOneCompany/${id}`, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async totalSold(token: string) {
        return (await axios.get<number>(`http://localhost:8080/admin/totalsold`, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async addCompany(token: string, company: Company) {
        return (await axios.post("http://localhost:8080/admin/addCompany", company, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async updateCompany(token: string, company: Company) {
        return (await axios.put("http://localhost:8080/admin/updateCompany", company, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async deleteCompany(token: string, id: number) {
        return (await axios.delete(`http://localhost:8080/admin/company/${id}`, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async getAllCustomers(token: string) {
        return (await axios.get<Customer[]>("http://localhost:8080/admin/customers", { headers: { Authorization: "Bearer " + token } })).data;
    }

    async getOneCustomer(token: string, id: number) {
        return (await axios.get<Customer>(`http://localhost:8080/admin/customers/${id}`, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async addCustomer(token: string, customer: Customer) {
        return (await axios.post("http://localhost:8080/admin/addCustomer", customer, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async updateCustomer(token: string, customer: Customer) {
        return (await axios.put("http://localhost:8080/admin/updateCustomer", customer, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async deleteCustomer(token: string, id: number) {
        return (await axios.delete(`http://localhost:8080/admin/customer/${id}`, { headers: { Authorization: "Bearer " + token } })).data;
    }
}

const adminService = new AdminService();
export default adminService;
