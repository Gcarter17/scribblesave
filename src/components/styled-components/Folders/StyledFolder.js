import styled, { css } from 'styled-components'
import { fadeRight } from '../animations'
import { variables } from '../variables'

export default styled.div`

  flex-grow: 1;
  height: 100%;
  /* overflow-y: scroll; */
  overflow-y: ${props => props.isActive ? 'scroll' : 'hidden'};

  background-color: ${variables.colorFolders};
  border: 2px solid grey;
  position: relative;

  h1 {
    color: white;
  }


  /* Track */
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    // background: #888; 
    background: transparent; 
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    // background: #555; 
    background: white;
  }

  ${props => props.active && css`
    flex-basis: 99%;
    background: rgb(73,73,73);
    width: 100%;
    min-height: 100%;
    z-index: 2;
    position: absolute;
	animation: 1s ${fadeRight} 0s;
  `};

`