import styled, { css } from 'styled-components'
import { variables } from '../variables'


const scalingCss = (props) => {
    if (props.scale === 'small') { // SMALL SIZE
        return (css`
            width: 270px;
            height: 50px;
            padding-top: .9rem !important;

            svg {
                font-size: 2.5rem;
            }

            div {
                height: 72px;
                padding: .1rem;
                border-radius: 5px !important;
            }
        
  `)
    } else if (props.scale === 'medium') {
        return (css`
            width: 270px;
            height: 90px;
            padding-top: .5rem !important;
            svg {
                font-size: 3rem;
            }

            div {
                height: 80px;
                padding: .5rem;
            }
   
  `)
    } else {
        return (css`
            width: 270px;
            height: 270px;
            svg {
                font-size: 9rem;
            }

            div {
                height: 176px;
                padding: 1rem;
            }
      `)
    }
}

export default styled.div`
  position: absolute;
  margin: 0 auto;
  background-color: ${props => props.index % 2 !== 0 ? variables.colorPrimaryLight : variables.colorPrimary};

  ${props => scalingCss(props)}

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  padding: 1rem;
  backface-visibility: hidden;
    
     &:hover {
        div {
            background-color: ${variables.colorPrimary};
        }
    }

    svg {
        color: white;
    }

    div {
        display: flex;
        background-color: ${variables.colorPrimaryDark};
        border-radius: 50%;
        transition: all .3s;
    }

  /* SELECTED */
  /* ${props => props.current === props.id && css`
    width: 700px !important;
    height: auto !important;
    min-height: 700px !important;
    background-color: ${variables.colorBackground} !important;
    left: ${(props.index + 1) % 6 === 0 && props.index !== 0 ? '-430px' : props.index === 0 || props.index % 6 === 0 ? '0px' : '-215px'} !important;  // half of the difference between 700 and 270 (which is 430px)
  `} */



`