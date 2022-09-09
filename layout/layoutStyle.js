import styled from 'styled-components'

export const Root = styled.div`
    min-height: var(--app-height);
    overflow-y: auto;
    position: relative;
`

export const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    min-height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const LayoutBackgroundContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    > .background {
        width: 100%;
        height: 100%;
    }
    > .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
`

export const StepShareBg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.mobileBg});
    background-size: cover;
    background-position: center center;
    @media (min-width: ${(props) => props.theme.mediaQueryBreak}) {
        background-image: url(${(props) => props.desktopBg});
    }
`

export const StepContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    height: 100vh;
`

export const HeaderBlock = styled.div`
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
`

export const LogoGenoshaContainer = styled.div`
    cursor: pointer;
    display: flex;
    width: '100%';
    justify-content: 'center';
    > div {
        > svg {
            width: 45px;
            height: fit-content;
        }
    }
`

export const MenuContainer = styled.div`
    cursor: pointer;
    display: flex;
    width: '100%';
    justify-content: 'center';
    > div {
        > svg {
            width: 25px;
            height: fit-content;
        }
    }
`

export const Text = styled.p`
    margin: ${(props) => props.margin || 0};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding || 0};
    font-weight: ${(props) => props.fontWeight || 'unset'};
    letter-spacing: ${(props) => props.letterSpacing || 'unset'};
    font-size: ${(props) => props.fontSize || 'unset'};
    line-height: ${(props) => props.lineHeight || 'unset'};
    text-transform: ${(props) => props.textTransform || 'unset'};
    max-width: ${(props) => props.maxWidth || 'unset'};
    width: ${(props) => props.width || 'unset'};
    overflow: ${(props) => props.overflow || 'unset'};
    white-space: ${(props) => props.whiteSpace || 'unset'};
    text-overflow: ${(props) => props.textOverflow || 'unset'};
    text-decoration: ${(props) => props.textDecoration || 'unset'};
    text-align: ${(props) => props.textAlign || 'unset'};
    position: ${(props) => props.position || 'unset'};
    cursor: ${(props) => props.cursor || 'unset'};
    z-index: 2;
    font-family: ${(props) => props.fontFamily};
    word-break: break-word;
    span {
        font-weight: 900;
    }
`

export const ModalContainer = styled.div`
    z-index: 6;
    height: 70vh;
    width: 75vw;
    max-width: 750px;
    @media (max-width: ${(props) => props.theme.mediaQueryBreakLaptop}) {
        width: 90vw;
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        height: 90vh;
        width: 90vw;
        position: absolute;
        top: 20px;
    }
    @media (min-width: ${(props) => props.theme.mediaQueryBreak}) {
        height: 90vh;
        width: 90vw;
        position: absolute;
        top: 50px;
    }
`
