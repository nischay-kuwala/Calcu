import React from "react";
import { ACTIONS } from "./App";
export default function Operationbutton({ dispatch, operation }) {
  return (
    <button
      className="text-lg font-semibold bg-white rounded-full"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERAND, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
