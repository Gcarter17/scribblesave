import styled from 'styled-components'
import { variables } from './variables'

export default styled.input`

  display: inline-block;
  background: ${props => props.primary ? variables.colorPrimary : '#f4f4f4'};
  color: ${props => props.primary ? '#fff' : '#333'};
  padding: 0.4rem 1.3rem;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  padding: 11px 1.7rem;
`