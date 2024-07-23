import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};



const customerSlice = createSlice(
  {
    name: 'customer',
    initialState,
    reducers: {
      create(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalID;
        state.createdAt = action.payload.createdAt; 
      }
    }
  }
);

/*export default function customerReducer(state = initialStateCustomers, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}*/

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/create",
    payload: {
      fullName: fullName,
      nationalID: nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}


export default customerSlice.reducer;