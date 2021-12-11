import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import carsApi from '../helpers/cars.api';
import authApi from '../helpers/auth.api';
import commentsApi from '../helpers/comments.api';

const HomePage = () => {

    const [cars, setCars] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentText, setCurrentText] = useState('');
    const [error, setError] = useState('');

    const getCars = async()=>{
        try {
            const data = await carsApi.findAll();
            setCars(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCars();
        setUser(authApi.getDataUser());
    }, []);

    const handleChangePage =(page)=>{
        setCurrentPage(page)
    }

    const handleChangeText = (event)=>{
        setCurrentText(event.currentTarget.value);
    }

    const itemsPerPage = 5;
 
    const paginatedCars = Pagination.getData(cars,currentPage,itemsPerPage);

    const handleSubmit = async(car,event) =>{
        event.preventDefault();
        try {
            const result = await commentsApi.sendComment(user,car,currentText);
            if(result){
                window.location.href= '/';
            }
            setError('')
        } catch (error) {
            setError('Vérifier le contenue!')
        }
    }
    return(
        <>
            <h3>Liste des voitures</h3>
            
            {paginatedCars && paginatedCars.map((car,key)=>
            <form key={key} >
                <div className="card mt-2">
                    <h5 className="card-header">Nom : {car.name.toUpperCase()}</h5>
                    <div className='container'>  
                        <div className="card-body">
                            <h4>Description:</h4>
                            <p className="card-text"> {car.description}</p>
                            {window.localStorage.getItem('authToken') &&
                            <>
                                <h4>listes des commentaires</h4>
                                <ul className="list-group list-group-flush">
                                    {car.comments && car.comments.map((comment, key)=>
                                        <li key={key} className="list-group-item">{comment.content}</li>
                                    )}
                                </ul>
                                <div className="form-group">
                                    <textarea className={"form-control" + (error && " is-invalid")}  placeholder="Ajouter votre commentaire" id="comment" value={currentText} onChange={handleChangeText} required></textarea>
                                    {error && <p className='invalid-feedback'>{error}</p>}
                                </div>
                                <div>
                                    <button 
                                        className="btn btn-primary mt-2 float-right"
                                        type="submit"
                                        onClick={(event)=>handleSubmit(car,event)}
                                    >
                                        Commenter
                                    </button>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </form>
            )}
           
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={cars.length} onPageChange={handleChangePage}/>
        </>
    )
}

export default HomePage;