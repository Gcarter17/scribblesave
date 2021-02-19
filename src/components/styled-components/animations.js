import { keyframes } from 'styled-components'
import { variables } from './variables'




export const expandSmall = keyframes`
    from {
        z-index: 0;
        width: 270px;
        min-height: 50px;
    }
    to {
        z-index: 1;
        width: 270px;
        min-height: 270px;
    }
`

export const expandMedium = keyframes`
    from {
        z-index: 0;
        width: 270px;
        min-height: 90px;
    }
    to {
        z-index: 1;
        width: 270px;
        min-height: 270px;
    }
`

export const expandLarge = keyframes`
    from {
        z-index: 0;
        width: 270px;
        min-height: 270px;
        left: 0;
    }
    to {
        z-index: 1;
        width: 400px;
        min-height: 400px;
        left: -65px;  // half of the difference between 500 and 270 (which is 230px)
    }
`

export const contractSmall = keyframes`
    from {
        z-index: 1;
        width: 270px;
        min-height: 270px;
    }
    to {
        z-index: 0;
        width: 270px;
        min-height: 50px;
        left: 0;
    }
`

export const contractMedium = keyframes`
    from {
        z-index: 1;
        width: 270px;
        min-height: 270px;
    }
    to {
        z-index: 0;
        width: 270px;
        min-height: 90px;
        left: 0;
    }
`

export const contractLarge = keyframes`
    from {
        z-index: 1;
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

export const fadeRight = keyframes`
	from {
		opacity: .3;
		transform: translate3d(-30%, 0,0);
	}
	to {
		opacity: 1;
		transform: translate3d(0,0,0);
	}
`

// export const expandSmall = keyframes`
//     from {
//         z-index: 0;
//         width: ${variables.standardSize};
//         min-height: ${variables.smallSize};
//     }
//     to {
//         z-index: 1;
//         width: ${variables.standardSize};
//         min-height: ${variables.standardSize};
//     }
// `

// export const expandMedium = keyframes`
//     from {
//         z-index: 0;
//         width: ${variables.standardSize};
//         min-height: {variables.mediumSize};
//     }
//     to {
//         z-index: 1;
//         width: ${variables.standardSize};
//         min-height: ${variables.standardSize};
//     }
// `

// export const expandLarge = keyframes`
//     from {
//         z-index: 0;
//         width: ${variables.standardSize};
//         min-height: ${variables.standardSize};
//         left: 0;
//     }
//     to {
//         z-index: 1;
//         width: ${variables.largeSize};
//         min-height: ${variables.largeSize};
//         left: calc((${variables.largeSize} - ${variables.standardSize})/-2);  // half of the difference between 500 and 270 (which is 230px)
//     }
// `

// export const contractSmall = keyframes`
//     from {
//         z-index: 1;
//         width: ${variables.standardSize}; 
//         min-height: ${variables.standardSize};  
//     }
//     to {
//         z-index: 0;
//         width: ${variables.standardSize};
//         min-height: ${variables.smallSize};
//         left: 0;
//     }
// `

// export const contractMedium = keyframes`
//     from {
//         z-index: 1;
//         width: ${variables.standardSize};  // 270
//         min-height: ${variables.standardSize};  //270
//     }
//     to {
//         z-index: 0;
//         width: ${variables.standardSize};  //270
//         min-height: {variables.mediumSize};  //90
//         left: 0;
//     }
// `

// export const contractLarge = keyframes`
//     from {
//         z-index: 1;
//         width: ${variables.largeSize};
//         min-height: ${variables.largeSize};
//         left: calc((${variables.largeSize} - ${variables.standardSize})/-2);  // half of the difference between 500 and 270 (which is 230px)
//     }
//     to {
//         z-index: 0;
//         width: ${variables.standardSize};
//         min-height: ${variables.standardSize};
//         left: 0;
//     }
// `

// export const fadeRight = keyframes`
// 	from {
// 		opacity: .3;
// 		transform: translate3d(-30%, 0,0);
// 	}
// 	to {
// 		opacity: 1;
// 		transform: translate3d(0,0,0);
// 	}
// `