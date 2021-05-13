import axios from 'axios';

const HOBBY_API_BASE_URL = "http://localhost:8080/api/hobbybook/hobbies/";

class HobbyService{
    
   
    getHobbies(username)
    {
        return axios.get(HOBBY_API_BASE_URL +`${username}`,{
            headers:{"Authorization": "Bearer " + sessionStorage.getItem("Jwt")}
        });
    }
     
    
    findHobbyById(hobbyId){
        return axios.get(HOBBY_API_BASE_URL + `find/${hobbyId}`,{
            headers:{"Authorization": "Bearer " + sessionStorage.getItem("Jwt")}
    });
    }

    createHobby(username,hobby)
    {
        return axios.post(HOBBY_API_BASE_URL + `add/${username}/`,hobby,{
            headers:{"Authorization": "Bearer " + sessionStorage.getItem("Jwt")}
        });
    }

    updateHobby(hobbyId,hobby)
    {
        return axios.put(HOBBY_API_BASE_URL + 'update/' + hobbyId,hobby,{
            headers:{"Authorization": "Bearer " + sessionStorage.getItem("Jwt")}
        });
    }

    deleteHobby(hobbyId)
    {
        return axios.delete(HOBBY_API_BASE_URL  + `delete/${hobbyId}`+ "",{
            headers:{"Authorization": "Bearer " + sessionStorage.getItem("Jwt")}
        });
    }
}

export default new HobbyService();