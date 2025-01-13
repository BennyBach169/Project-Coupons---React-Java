import { Class } from "@mui/icons-material";
import axios from "axios";

class LoginService{
    async login(clientType: string, email: string, password: string){
        return await axios.get<string>(`http://localhost:8080/login?clientType=${clientType}&email=${email}&password=${password}`)
    }
    async lotout(token: string){
        return (await axios.post(`http://localhost:8080/login/logout?token=${token}`)).data;
    }
}

const loginService = new LoginService;
export default loginService;