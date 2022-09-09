import styled from 'styled-components';

export const Root = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    color: #fff;
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
    }
`;
