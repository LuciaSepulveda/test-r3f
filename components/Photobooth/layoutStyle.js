import styled from 'styled-components';

export const Root = styled.div`
    min-height: var(--app-height);
    overflow-y: auto;
    position: relative;
    /* padding: 60px 65px 20px 65px; */
    /* padding: 60px 65px 105px 65px; */
    padding: 0px 65px 105px 65px;
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        padding: 0 20px 55px 20px;
    }
    @media (min-width: ${(props) =>
            props.theme.mediaQueryBreak}) and (max-width: ${(props) =>
            props.theme.mediaQueryBreakLaptop}) {
        padding: 0px 65px 20px 65px;
    }
    @media (max-height: 900px) and (max-width: 600px) {
        padding-bottom: 53px;
    }
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* padding: 60px 65px; */
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        /* padding: 30px 20px; */
    }
`;

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
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

export const StepShareBg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.mobileBg});
    background-size: cover;
    background-position: center center;
    @media (min-width: ${(props) => props.theme.mediaQueryBreak}) {
        background-image: url(${(props) => props.desktopBg});
    }
`;

export const StepContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    max-width: 100%;
    height: 100%;
    /* overflow-y: auto; */
    @media (max-width: ${(props) => props.theme.mediaQueryBreakLaptop}) {
        margin-top: ${(props) => (props.currentStep !== 7 ? '200px' : '130px')};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        margin-top: 230px;
        margin-top: ${(props) => (props.currentStep !== 7 ? '230px' : '150px')};
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak2}) {
        margin-top: ${(props) => (props.currentStep !== 7 ? '170px' : '110px')};
    }
    @media (min-width: ${(props) => props.theme.mediaQueryBreakLaptop}) {
        margin-top: 240px;
    }
    @media (max-height: 900px) and (max-width: ${(props) =>
            props.theme.mediaQueryBreak}) {
        margin-top: ${(props) => (props.currentStep !== 7 ? '170px' : '110px')};
    }
`;

export const HeaderBlock = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 220px;
    /* min-height: 220px; */
    justify-content: center;
    align-items: flex-start;
    @media (min-width: ${(props) => props.theme.mediaQueryBreak}) {
        position: absolute;
        top: 0;
        width: 100%;
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        position: absolute;
        top: 0;
        width: 100%;
        height: 220px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        @media (max-width: ${(props) => props.theme.mediaQueryBreak2}) {
            height: 200px;
        }
    }
`;

export const HeaderBlockContent = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 220px;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        height: 220px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        @media (max-width: ${(props) => props.theme.mediaQueryBreak2}) {
            height: 200px;
        }
    }
`;

export const FontierIconContainer = styled.div`
    display: flex;
    margin-top: 94px;
    width: '100%';
    justify-content: 'center';
    > div {
        > svg {
            width: 463px;
            height: 106px;
        }
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreakLaptop}) {
        margin-top: 80px;
        > div {
            > svg {
                width: 348px;
                height: 80px;
            }
        }
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        margin-top: 160px;
        > div {
            > svg {
                width: 230px;
                height: 50px;
            }
        }
    }
    @media (max-height: 900px) and (max-width: ${(props) =>
            props.theme.mediaQueryBreak}) {
        margin-top: 115px;
        > div {
            > svg {
                width: 230px;
                height: 50px;
            }
        }
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak2}) {
        margin-top: 110px;
        > div {
            > svg {
                width: 170px;
                height: 40px;
            }
        }
    }
`;

export const PositionContainer = styled.div`
    display: ${(props) => props.displayProp || 'flex'};
    height: ${(props) => props.heightProp || 'unset'};
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    position: ${(props) => props.positionProp || 'absolute'};
    top: ${(props) => props.topProp || 'unset'};
    left: ${(props) => props.leftProp || 'unset'};
    right: ${(props) => props.rightProp || 'unset'};
    bottom: ${(props) => props.bottomProp || 'unset'};
    @media (min-width: ${(props) => props.theme.mediaQueryBreakLaptop}) {
        ${(props) =>
            props.nissanIcon &&
            `
                top: 60px;
                left: 60px;
            `}
        ${(props) =>
            props.engineerIcon &&
            `
                top: 60px;
                right: 60px;
            `}
        ${(props) =>
            props.intelligentIcon &&
            `
                z-index: 0;
                right: 60px;
            `}
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreakLaptop}) {
        ${(props) =>
            props.engineerIcon &&
            `
                > div {
                    > svg {
                            display: none;
                    }
                }
            `}
        ${(props) =>
            props.nissanIcon &&
            `
                > div {
                    > svg {
                                width: 131px;
                                height: 108px;
                        }
                    }
            `}
    }
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        display: ${(props) => props.displayPropMobile || 'flex'};
        top: ${(props) => props.topPropMobile || 'unset'};
        left: ${(props) => props.leftPropMobile || 'unset'};
        right: ${(props) => props.rightPropMobile || 'unset'};
        bottom: ${(props) => props.bottomPropMobile || 'unset'};
        position: ${(props) => props.positionPropMobile || 'absolute'};
        ${(props) =>
            props.nissanIcon &&
            `
                > div {
                    > svg {
                            width: 120px;
                            height: 100px;
                            @media (max-height: 900px) and (max-width: ${props.theme.mediaQueryBreak}) {
                                width: 75px;
                                height: 67px;
                        }
                    }
                }
            `}
        ${(props) =>
            props.intelligentIcon &&
            `
            z-index: 0;
            > img {
                width: 94px;
                height: 34px;
                @media (max-width: ${props.theme.mediaQueryBreak2}) {
                    width: 63px;
                    height: 22px;
                }
            }
            @media (max-width: ${props.theme.mediaQueryBreak2}) {
                bottom: 15px;
                > imb {
                    width: 63px;
                    height: 22px;
                }
            }
        `}
    }
`;

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
`;

export const ModalContainer = styled.div`
    z-index: 6;
    height: 500px;
    width: 400px;
    @media (max-width: ${(props) => props.theme.mediaQueryBreak}) {
        height: 450px;
        width: 100%;
    }
`;
