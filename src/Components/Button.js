import React from 'react';
import styled from 'styled-components';

// Button style define
const ButtonElement = styled.button`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    font-size: ${props => props.fontSize || '16px'};
    margin: ${props => props.margin || '0 0 0 0'};
    color: #FFFFFF;
    background-color: orange;
    border: none;
    border-radius: 30px;
    cursor: pointer;
`;

const Button = ({width, height, margin, fontSize, text, onClick}) => {
    return <ButtonElement fontSize={fontSize} width={width} height={height} margin={margin} onClick={onClick}>{text}</ButtonElement>;
};

export default Button;