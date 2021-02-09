import styled, { css } from 'styled-components'
import { expand, contract } from './animations'
import { variables } from './variables'

export default styled.div`
  position: absolute;
  margin: 0 auto;
  background-color: ${props => props.index % 2 !== 0 ? variables.colorPrimary : variables.colorPrimaryDark};
  height: 270px;
  width: 270px;
  border-radius: 5px;
  display: block;
  overflow: hidden;
  padding: 1rem;
  backface-visibility: hidden;
  animation: ${contract} .5s forwards ;
  

  * {
    border: none !important;
    outline: none !important;
  }

  *:focus {
    border: none !important;
    outline: none !important;
  }

  h6 {
    font-size: 1.5rem;
    line-height: 30px;
    margin-bottom: 1rem;
  }

  
  /* HOVERED */
  ${props => props.currentFolder && css`
    &:hover {
        animation-delay: .42s;
        animation: ${expand} .4s forwards;
        backface-visibility: hidden;
        transform: translateZ(0) scale(1.0, 1.0);
    }
  `}


  /* SELECTED */
  ${props => props.current === props.id && css`
    width: 700px !important;
    height: auto !important;
    min-height: 700px !important;
    z-index: 12 !important;
    // IMPORTANT ============================ below everywhere there is a 6, you can plug in the width of the grid
    left: ${(props.index + 1) % 6 === 0 && props.index !== 0 ? '-430px' : props.index === 0 || props.index % 6 === 0 ? '0px' : '-215px'} !important;  // half of the difference between 700 and 270 (which is 430px)
  `}



.scribble-content {
  padding: 1.1rem;
  padding-top: 0rem !important;
  overflow-x: hidden;
}

.scribble-x {
  position: absolute;
  right: 1.5rem;
  color: white;
  cursor: pointer;
}

`