import styled, { css } from 'styled-components'
import { variables } from '../variables'

export default styled.div`

    width: ${props => props.small ? '25px' : props.medium ? '37px' : props.large && '50px'};
    height: ${props => props.small ? '25px' : props.medium ? '37px' : props.large && '50px'};
    border: 2px solid ${variables.colorPrimaryLight};
    border-radius: 5px;
    margin-left: 1rem;
    

`