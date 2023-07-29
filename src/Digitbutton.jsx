import React from "react";
import { ACTIONS } from "./App";
export default function Digitbutton({ dispatch, digit }) {
  return (
    <button
      className="text-lg font-semibold bg-white rounded-full"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
}
