import axios from 'axios';


class AuthenticationService {

    getLoggedInUserName() {
        let username = sessionStorage.getItem("authenticatedUser")
        if (username === null) return ''
        return username;
    }

    getLoggedInUserId(){
        let id = sessionStorage.getItem("id")
        if(id === null) return ''
        return id
    }

    isUserLogged() {
        let user = sessionStorage.getItem("authenticatedUser")

        if (user === null) return false
        return true
    }

    isUserAdmin(){
        if(sessionStorage.getItem("role") === "ROLE_ADMIN") return true
        return false
    }

    signin(username, password) {
        return axios.post("http://localhost:8080/api/auth/signin", { username, password });
    }

    signup(username, firstName, lastName, email, password, age, gender) {
        return axios.post("http://localhost:8080/api/auth/signup",
            {
                username:username,
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                age:age,
                gender:gender
            }
        );
    }

    logout() {
        sessionStorage.clear()
        window.location.href = '/signin';
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }

    success(username, token, id, role) {
        sessionStorage.setItem("authenticatedUser", username);
        this.setupAxiosInterceptors(this.createJwtToken(token));
        sessionStorage.setItem("Jwt", token);
        sessionStorage.setItem("id",id);
        sessionStorage.setItem("role",role)
        window.location.reload();
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLogged()) {
                    config.headers.authorization = token;
                }
                return config
            }
        )
    }

}

export default new AuthenticationService();