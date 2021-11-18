import React from 'react';
import './Pagination.css';
import Button from '@mui/material/Button';

const Pagination = ({nextPage, prevPage, disablePages}) => {
    return (
        <>
            <footer className="footer">
               <div className="nextPage">
                   <Button disabled={disablePages.next}variant="contained" color="error" onClick={nextPage}>NextPage</Button>
               </div>
               <div className="grow" />
               <div className="prevPage">
                   <Button disabled={disablePages.prev}variant="contained" color="error" onClick={prevPage}>PrevPage</Button>
               </div>
            </footer>
        </>
    )
}

export default Pagination;