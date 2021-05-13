import axios from 'axios';

class MatchService {
    
    getMatches(username)
    {
        return axios.get(`http://localhost:8080/api/hobbybook/matches/${username}`,{
            headers:{"Authorization" : "Bearer " + sessionStorage.getItem("Jwt")}
        });
    }
   
}
export default new MatchService();