import {
  GET_SCRIBBLES,
  ADD_SCRIBBLE,
  DELETE_SCRIBBLE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SCRIBBLE,
  FILTER_SCRIBBLES,
  CLEAR_FILTER,
  SCRIBBLE_ERROR,
  CLEAR_SCRIBBLES,
} from "../types";

// case FILTER_SCRIBBLES:
//       return {
//         ...state,
//         filtered: state.scribbles.sort((a, b) => (a.favorite > b.favorite) ? -1 : 1),
//       };
// ------------ filters favorites to be first
// const func = () => {
//   let placeHolder = ["5ecc0f9045ba2e6894a3dc23", "5ecc10c50371012344e8c68e", "5ecc10c50371012344e8c68f"]

// const func = () => {
//   let scribblesArr = []
//   scribblesArr = scribbles.map((item) => {
//     return item._id
//   })

//   let arr = []
//   scribbles.forEach((scribble) => {
//     scribble.experience.forEach(element => {
//       arr.push(element._id)
//     })
//   })
//   // console.log(arr)
//   scribblesArr = scribblesArr.filter((item) => {
//     return !arr.includes(item)
//   })
//   console.log(scribblesArr) //scribblesArr is now filtered from what was in the "experience" arrays

// }
// func()

export default (state, action) => {
  switch (action.type) {
    case GET_SCRIBBLES:
      return {
        ...state,
        // scribbles: action.payload.sort((a, b) => a.date - b.date), // sorts based on date
        scribbles: action.payload,
        // scribbles: r.sort((a, b) => a.date - b.date),
        // scribbles:action.payload  doesn't offer any sorting except order in which they're organized in DB
        loading: false,
      };
    case ADD_SCRIBBLE:
      return {
        ...state,
        scribbles: [action.payload, ...state.scribbles],
        loading: false,
      };
    case UPDATE_SCRIBBLE:
      return {
        ...state,
        scribbles: state.scribbles.map((scribble) =>
          scribble._id === action.payload._id ? action.payload : scribble
        ),
        loading: false,
      };
    case DELETE_SCRIBBLE:
      return {
        ...state,
        scribbles: state.scribbles.filter(
          (scribble) => scribble._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_SCRIBBLES:
      return {
        ...state,
        scribbles: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case FILTER_SCRIBBLES:
      return {
        ...state,
        filtered: state.scribbles.filter((scribble) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return scribble.title.match(regex) || scribble.content.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SCRIBBLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
