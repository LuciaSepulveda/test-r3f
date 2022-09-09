import React from 'react';

export const ArrowBack = (props) => {
    return (
        <svg
            width={props.width || '11'}
            height={props.height || '18'}
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 16.8824L1.7323 10.3449C0.7559 9.57286 0.7559 8.30949 1.7323 7.53743L10 1"
                stroke={props.color || '#F1F1F1'}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
