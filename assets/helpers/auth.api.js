import axios from 'axios';
import jwtDecode from 'jwt-decode';

let token;

function logout (){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials){
    return axios.post("http://localhost:8000/api/login_check",credentials)
        .then(response=>response.data.token)
        .then(token => {
             //save token
            window.localStorage.setItem('authToken', token);
            //add default header for all request
            axios.defaults.headers["Authorization"] = "Bearer" + token;

            return true
        })
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()){
                axios.defaults.headers["Authorization"] = "Bearer" + token;
        }else{
            logout();
        }
    }
}

function getDataUser(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        return jwtData;
    }
}

export default {
    authenticate,
    logout,
    setup,
    getDataUser
}