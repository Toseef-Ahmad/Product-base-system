import React from 'react';
import './Pagination.css';
const Pagination = ({nextPage, prevPage}) => {
    return (
        <>
            <footer className="footer">
               <div className="nextPage">
                   <button onClick={nextPage}>NextPage</button>
               </div>
               <div className="grow" />
               <div className="prevPage">
                   <button onClick={prevPage}>PrevPage</button>
               </div>
            </footer>
        </>
    )
}

export default Pagination;