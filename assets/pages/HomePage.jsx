import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import carsApi from '../helpers/cars.api';

const HomePage = () => {

    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
    }, []);

    const handleChangePage =(page)=>{
        setCurrentPage(page)
    }

    const itemsPerPage = 5;
 
    const paginatedCars = Pagination.getData(cars,currentPage,itemsPerPage);
    
    return(
        <>
            <h3>Liste des voitures</h3>
            {paginatedCars && paginatedCars.map((car,key)=>
                <div key={key} className="card mt-2">
                    <h5 className="card-header">{car.name}</h5>
                    <div className="card-body">
                        <p className="card-text">{car.description}</p>
                        <div className='container'>
                            <p>listes des commentaires</p>
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Ajouter votre commentaire" id="comment"></textarea>
                            </div>
                            <div>
                                <button className="btn btn-primary mt-2 float-right">Commenter</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={cars.length} onPageChange={handleChangePage}/>
        </>
    )
}

export default HomePage;