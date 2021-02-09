import { keyframes } from 'styled-components'

export const expand = keyframes`
    from {
        z-index: 0;
        width: 270px;
        min-height: 270px;
        left: 0;
    }
    to {
        z-index: 10;
        width: 400px;
        min-height: 400px;
        left: -65px;  // half of the difference between 500 and 270 (which is 230px)
    }
`

// export const expand = keyframes`
//     from {
//         z-index: 0;
//         width: 270px;
//         min-height: 270px;
//         left: 0;
//     }
//     to {
//         z-index: 10;
//         width: 400px;
//         min-height: 400px;
//         left: -65px;  // half of the difference between 500 and 270 (which is 230px)
//     }
// `

export const contract = keyframes`
    from {
        z-index: 10;
        width: 400px;
        min-height: 400px;
        left: -65px;  // half of the difference between 500 and 270 (which is 230px)
    }
    to {
        z-index: 0;
        width: 270px;
        min-height: 270px;
        left: 0;
    }
`