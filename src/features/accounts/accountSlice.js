import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 50,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.loan = action.payload.loanAmount;
      state.loanPurpose = action.payload.loanPurpose;
      state.balance += action.payload.loanAmount;
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log("accountSlice data: ", accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions; // export the action creators that redux toolkit created

export function deposit(amount, currency) {
  // export a custom action creator that uses thunk
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    // API call
    dispatch({ type: "account/convertingCurrency", payload: true });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    return dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export default accountSlice.reducer;
