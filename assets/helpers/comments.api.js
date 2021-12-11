import axios from "axios";

function findComments(id){
    return axios.get("http://localhost:8000/api/car/"+id+"/comments")
    .then(response =>response.data['hydra:member'])
}

function sendComment(user, car, content){
    const input = {
        content:content,
        user: '/api/users/'+user.id,
        car: '/api/cars/'+car.id
    }
        
    return axios.post("http://127.0.0.1:8000/api/comments",input,{
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
        }
    })
    .then(response=> response.data.content)
}

export default {
    findComments,
    sendComment
}