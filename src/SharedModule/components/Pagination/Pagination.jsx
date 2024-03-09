import {  useState } from "react";

export default function Pagination({ pagesArray, nameSearch, tagIdSearch, categoryIdSearch, anyFunction, emailSearch, rolesSearch }) {
  
    

    const [previous, setPrevious] = useState(0);
    const [next, setNext] = useState(3);

    function handleNext() {
        if (previous >= 1  ) {
            setPrevious(previous - 1);
            setNext(next - 1);
        }
    }

    function handlePrevious() {
        if (previous < pagesArray.length - 3) {
            setPrevious(previous + 1);
            setNext(next + 1);
        }
    }


  

    
    return (<>
        
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item  mx-2">
                    <button onClick={handleNext} className="page-link Pagination-num" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                </li>


                {pagesArray?.slice(previous, next).map((pageNum )=> <li key={pageNum} className="page-item">
                        <button onClick={() => anyFunction( pageNum , nameSearch, emailSearch, rolesSearch,tagIdSearch,categoryIdSearch)} className="page-link mx-1 Pagination-num">
                            {pageNum}
                        </button>
                    </li>) }
                



                <li className="page-item  mx-2">
                    <button onClick={handlePrevious} className="page-link Pagination-num" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    </>

    );
}
