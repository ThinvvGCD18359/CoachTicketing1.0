import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import coachReducer from "../features/Coach/coachSlice";
import seatReducer from "../features/Booking/seatSlice";

const rootReducer = {
  user: userReducer,
  coach: coachReducer,
  seat: seatReducer,
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;