import styled, { css } from 'styled-components'
import { expandSmall, expandMedium, expandLarge, contractSmall, contractMedium, contractLarge } from '../animations'
import { variables } from '../variables'


const scalingCss = (props) => {
  if (props.scale === 'small') { // SMALL SIZE
    return (css`
        width: 270px;
        height: 50px;
        animation: ${contractSmall} .5s forwards ;
        padding-top: .9rem !important;
        h6 {
          font-size: 1rem;
          margin-bottom: .3rem;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .scribble-content {
          padding-left: 0 !important;
          font-size: .9rem;
        }

        ${props => props.currentFolder && css`
          &:hover {
          animation-delay: .42s;
          animation: ${expandSmall} .4s forwards;
          backface-visibility: hidden;
          transform: translateZ(0) scale(1.0, 1.0);
        }
    `}
  `)
  } else if (props.scale === 'medium') {
    return (css`
    width: 270px;
    height: 90px;
    padding-top: .5rem !important;
    /* animation: ${contractMedium} .5s forwards ; */
    h6 {
      font-size: 1rem;
      margin-bottom: .3rem;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .scribble-content {
      padding-left: 0 !important;
      font-size: .9rem;
    }

    ${props => props.currentFolder && css`
      &:hover {
        animation-delay: .42s;
        /* animation: ${expandMedium} .4s forwards; */
        backface-visibility: hidden;
        transform: translateZ(0) scale(1.0, 1.0);
      }
    `}
  `)
  } else {
    return (    // NORMAL SIZE
      css`
        width: 270px;
        height: 270px;
        /* animation: ${contractLarge} .5s forwards ; */
        
        h6 {
          font-size: 1.5rem;
          line-height: 30px;
          margin-bottom: 1rem;
        }

        ${props => props.currentFolder && css`
          &:hover {
          animation-delay: .42s;
          /* animation: ${expandLarge} .4s forwards; */
          backface-visibility: hidden;
          transform: translateZ(0) scale(1.0, 1.0);
          }
        `}
      `
    )
  }
}

export default styled.div`
  position: absolute;
  margin: 0 auto;
  background-color: ${props => props.index % 2 !== 0 ? variables.colorPrimaryLight : variables.colorPrimary};

  ${props => scalingCss(props)}

  border-radius: 5px;
  display: block;
  overflow: hidden;
  padding: 1rem;
  backface-visibility: hidden;
  

  * {
    border: none !important;
    outline: none !important;
  }

  *:focus {
    border: none !important;
    outline: none !important;
  }

  /* SELECTED */
  ${props => props.current === props.id && css`
    width: 700px !important;
    height: auto !important;
    min-height: 700px !important;
    z-index: 12 !important;
    background-color: ${variables.colorBackground} !important;
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
  color: ${variables.colorRed};
  cursor: pointer;
  transition: all .2s;

  &:hover {
    color: ${variables.colorRedDark}
  }
}

`