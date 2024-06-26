import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    count: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, count, onPageChange }) => {
    const pageNumbers = [];

    // Determine the start and end of the page window
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    // Adjust the window if there are less than 3 pages in the range
    if (endPage - startPage < 2) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + 2);
        } else {
            startPage = Math.max(1, endPage - 2);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='flex items-center justify-center'>
            <p className='mr-3'>Page {currentPage} of {count}</p>
            <div className="flex justify-center items-center">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="p-2 mx-1 border rounded-[50%] disabled:opacity-50"
                >
                    <FaChevronLeft />
                </button>
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className={`w-[30px] h-[30px] mx-1 rounded-[50%] ${currentPage === 1 ? 'bg-[#42A7C3] border text-white' : 'text-white'}`}
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="mx-1 text-white">...</span>}
                    </>
                )}
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`w-[30px] h-[30px] mx-1 rounded-[50%] ${currentPage === number ? 'bg-[#42A7C3] border text-white' : 'text-white'}`}
                    >
                        {number}
                    </button>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="mx-1 text-white">...</span>}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={`w-[30px] h-[30px] mx-1 rounded-[50%] ${currentPage === totalPages ? 'bg-[#42A7C3] border text-white' : 'text-white'}`}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-2 mx-1 border rounded-[50%] disabled:opacity-50"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
