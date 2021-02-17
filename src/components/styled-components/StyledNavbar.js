import styled, { css } from 'styled-components'
import { expand, contract } from './animations'
import { variables } from './variables'

export default styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  z-index: 1;
  width: 100%;
  border-bottom: solid 1px ${variables.colorPrimaryLight};
  background: ${variables.colorPrimaryDark};
  opacity: 0.9;
  a, li {
    color: #fff;
    padding: 0.45rem;
    margin: 0 0.25rem;
  }

  ul {
    display: flex;
  }

  a:hover {
    color: #f4f4f4;
  }

`