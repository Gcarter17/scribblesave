import styled, { css } from 'styled-components'
import { expand, contract } from './animations'
import { variables } from './variables'

export default styled.input`
    
    font-size: ${props => props.name === 'title' ? '1.5rem' : '1rem'};
    font-weight: 600;

    background: white;
    width: 50%;
    padding: .5rem;
    border: 1px solid grey;
    border-radius: 5px;
    margin-bottom: 1rem;

    &:focus {
        box-shadow: 2px 2px 3px rgba(0,0,0,0.1) inset, 0 0;
    }
`