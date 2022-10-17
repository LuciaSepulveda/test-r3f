import styled, { keyframes } from 'styled-components';

const { div } = styled;

const panning = keyframes`
    0% {
        background-position-x: 0%;
    }
    50% {
        background-position-x: 100%;
    }
    100% {
        background-position-x: 0%;
    }
`;

export const BackgroundDiv = div`
    background-image: url(${({ image }) => image});
    background-position-y: 50%;
    background-size: cover;
    animation-name: ${panning};
    animation-iteration-count: infinite;
    animation-duration: ${({ duration }) => duration ?? 20}s;
    animation-timing-function: cubic-bezier(0.26, 0.01, 0.76, 1);
    width: 100%;
    height: 100%;
    @media (orientation: landscape) {
        background-size: auto 175%;
    }
`;
