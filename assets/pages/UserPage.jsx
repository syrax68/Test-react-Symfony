import React, { useEffect, useState } from 'react';
import userApi from '../helpers/user.api';

const UserPage = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async()=>{
        try {
            const data = await userApi.findAll();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return(
        <>
            <h3>Liste des utilisateurs</h3>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,key)=>
                        <tr key={key}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default UserPage;