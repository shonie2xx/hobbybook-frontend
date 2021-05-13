import axios from 'axios';

//const ACCOUNTS_API_BASE_URL = "http://localhost:8080/hobbybook/account";

class AccountsService {

    findAllAccounts(username) {
        return axios.get(`http://localhost:8080/api/hobbybook/admin/${username}`, {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }

    findAvailableAccounts(username) {
        return axios.get(`http://localhost:8080/api/hobbybook/users/ready/${username}`, {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }

    findById(id)
    {
        return axios.get(`http://localhost:8080/api/hobbybook/users/${id}`, {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }

    editUser_Pass(userId,user)
    {
        return axios.put(`http://localhost:8080/api/hobbybook/users/updatepass/${userId}` + "", user, {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }

    editUser(userId,user)
    {
        return axios.put(`http://localhost:8080/api/hobbybook/users/update/${userId}` + "",user, {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }

    deliteUser(userId)
    {
        return axios.delete(`http://localhost:8080/api/hobbybook/admin/users/delete/${userId}` + "", {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }
    // findUserByUsername(username) {
    //     return axios.get(`http://localhost:8080/api/hobbybook/users/${username}`, {
    //         headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
    //     });
    // }
    
    like(fromUserId, toUserId) {
        return axios.post(`http://localhost:8080/api/hobbybook/users/like/${fromUserId}/${toUserId}`,"", {
            headers:{ "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }
    
    pass(fromUserId,toUserId){
        return axios.post(`http://localhost:8080/api/hobbybook/users/pass/${fromUserId}/${toUserId}`,"", {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("Jwt") }
        });
    }
}

export default new AccountsService();