import styled from 'styled-components'

export const BtnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 54px;
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        max-width: 400px;
    }
`

export const ButtonContainer = styled.div`
    margin-right: 32px;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${(props) => props.theme.mediaQueryBreak2}) {
        margin-right: 15px;
    }
`

export const Container = styled.div`
    height: var(--app-height);
    display: flex;
    justify-content: center;
    align-items: center;
`
