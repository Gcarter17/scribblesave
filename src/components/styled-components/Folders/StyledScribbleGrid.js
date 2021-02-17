import styled, { css } from 'styled-components'
import { variables } from '../variables'

export default styled.div`

  padding: 0 2rem 0 2rem;
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  grid-template-columns: repeat( auto-fit, minmax(270px, 1fr) );
  grid-template-rows: repeat( minmax(3,auto-fit, minmax(270px, 1fr)) );
  /* grid-gap: 1.2rem; */

`