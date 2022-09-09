import React from 'react';

export const ArrowFoward = (props) => {
    return (
        <svg
            width={props.width || '13'}
            height={props.height || '20'}
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 1.99997L10.2677 8.5374C11.2441 9.30946 11.2441 10.5728 10.2677 11.3449L2 17.8823"
                stroke="#F1F1F1"
                strokeWidth="2.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
