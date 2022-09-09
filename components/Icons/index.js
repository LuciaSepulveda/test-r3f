import styled from 'styled-components';
import React from 'react';
import { ArrowBack } from './arrowBack';
import { ArrowFoward } from './arrowFoward';
import { GenoshaLogo } from './genoshaLogo';
import { GenoshaIsotipo } from './genoshaIsotipo';
import { MenuIcon } from './menu';

function select(name, color, iconColor, stroke, width, height) {
  switch (name) {
    case 'arrowBack':
      return <ArrowBack width={width} height={height} color={color} />;
    case 'arrowFoward':
      return <ArrowFoward width={width} height={height} color={color} />;
    case 'genoshaLogo':
      return <GenoshaLogo width={width} height={height} />;
    case 'genoshaIsotipo':
      return <GenoshaIsotipo width={width} height={height} />;
    case 'menu':
      return <MenuIcon width={width} height={height} />;
    default:
      break;
  }
  return null;
}

const Root = styled.div`
  display: flex;

  ${(props) => props.debug && `border: solid 1px red;`}
  ${(props) =>
    props.hover &&
    `:hover {
    cursor: pointer;
  }`}
  > svg {
    ${(props) => props.size === 'sm-x' && `width: 10px; height: 10px;`}
    ${(props) => props.size === 'sm-15' && `width: 15px; height: 15px;`}
        ${(props) => props.size === 'sm' && `width: 20px; height: 20px;`}
        ${(props) => props.size === 'md' && `width: 60px; height: 60px;`}
        ${(props) => props.size === 'md50' && `width: 40px; height: 40px;`}
        ${(props) => props.size === 'lg' && `width: 100px; height: 100px;`}
        ${(props) =>
      props.width &&
      props.height &&
      `width: ${props.width}; height: ${props.height};`}
    transition: all 225ms linear;
  }
`;

const Icon = (props) => {
  const {
    name = 'close',
    size = 'sm',
    debug = false,
    onClick,
    hover,
    color,
    iconColor,
    stroke,
    width,
    height,
  } = props;
  return (
    <Root
      onClick={() => onClick && onClick()}
      size={size}
      debug={debug}
      hover={hover}
      {...props}
    >
      {select(name, color, iconColor, stroke, width, height)}
    </Root>
  );
};

export default Icon;
