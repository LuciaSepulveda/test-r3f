import React from 'react';
import { BackgroundDiv } from './styles';

const SelectComponent = ({ image, duration = 20 }) => {
    return <BackgroundDiv image={image} duration={duration} />;
};
export default SelectComponent;