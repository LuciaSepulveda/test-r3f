import { createGlobalStyle } from 'styled-components';

import poppinsFontMedium from '../public/fonts/Poppins-Medium.ttf'

export default createGlobalStyle`
    @font-face {
        font-family: 'Font Name';
        src: local('Font Name'), local('FontName'),
        url(${poppinsFontMedium}) format('ttf'),
        font-weight: 300;
        font-style: normal;
    }
`;