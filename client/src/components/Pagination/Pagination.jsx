import React from 'react';
import {LeftArrow, RightArrow, DoubleLeftArrow, DoubleRightArrow} from '../SvgIcons';
import style from './Pagination.module.css';

const Pagination = ({handleChange, totalItems, currentPage, countPerPage}) => {
    const pagesCount = Math.ceil(totalItems / countPerPage);
    if (pagesCount === 1) return null;
    let firstNumber = 1;
    let lastNumber = 1;
    const adicionalNumbers = 2;
    let countOfNumbers = adicionalNumbers * 2 + 1;
    if (countOfNumbers >= pagesCount) {
        countOfNumbers = pagesCount;
    } else {
        firstNumber = Math.max(currentPage - adicionalNumbers, 1);
        lastNumber = Math.min(currentPage + adicionalNumbers, pagesCount);
        if (lastNumber === pagesCount) {
            firstNumber += lastNumber - firstNumber - adicionalNumbers * 2;
        }
    }

    const pageNumbers = new Array(countOfNumbers)
    .fill()
    .map((d, i) => i + firstNumber);

    return (
        <div className={style.paginationContainer}>
            <div onClick={() => handleChange(1)}
                className={`${style.paginationItem} ${
                currentPage === 1 ? style.disabled : ''
                }`}
                title='First Page'
            >
                <DoubleLeftArrow />
            </div>
            <div onClick={() => handleChange(currentPage - 1)}
                className={`${style.paginationItem} ${
                currentPage === 1 ? style.disabled : ''
                }`}
                title='Previous'
            >
                <LeftArrow />
            </div>
            {pageNumbers.map((number) => (
                <div
                    key={number}
                    className={`${style.paginationItem} ${
                    currentPage === number ? style.selected : ''
                    }`}
                    onClick={() => handleChange(number)}
                >
                    {number}
                </div>
            ))}

            <div
                onClick={() => handleChange(currentPage + 1)}
                className={`${style.paginationItem} ${
                pagesCount === currentPage ? style.disabled : ''
                }`}
                title='Next'
            >
                <RightArrow />
            </div>
            <div
                onClick={() => handleChange(pagesCount)}
                className={`${style.paginationItem} ${
                pagesCount === currentPage ? style.disabled : ''
                }`}
                title='Last Page'
            >
                <DoubleRightArrow />
            </div>
        </div>
    );
};

export default Pagination;