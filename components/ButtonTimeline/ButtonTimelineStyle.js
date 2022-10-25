import styled from 'styled-components'
export const Button = styled.button`
position: relative;
display: flex;
flex-direction:column;
background: none;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 22px;
color: #FFFFFF;
border: none;
margin-left: 10px;
margin-top: 10px;
opacity:0.4;
`
export const Span = styled.span`
animation: fadeIn 1s ease-in both;
text-align: left;
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translate3d(0, 0, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, -20%, 0);
	}
}
`

export const Line = styled.div`
    position: absolute;
    left: -2px;
    height: 100%;
    width: 1px;
    background: #FFFFFF;
    animation: fadeInLine 1s ease-in both;
    @keyframes fadeInLine {
        from {
            opacity: 0;
            height: 1%
            transform: translate3d(0, 0, 0);
        }
        to {
            opacity: 1;
            height: 100%
            transform: translate3d(0, -20%, 0);
        }
    }
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`

