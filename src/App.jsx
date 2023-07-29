import { useReducer, useState } from "react";
import Digitbutton from "./Digitbutton";
import Operationbutton from "./Operationbutton";

export const ACTIONS = {
  CHOOSE_DIGIT: "choose-digit",
  CHOOSE_OPERAND: "choose-operand",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CHOOSE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentoperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === 0 || state.currentoperand === " 0") {
        return { state };
      }
      if (payload.digit === "." && state.currentoperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentoperand: `${state.currentoperand || ""} ${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERAND:
      if (state.currentoperand == null && state.previousoprend == null) {
        return state;
      }
      if (state.currentoperand == null) {
        return { ...state, operation: payload.operation };
      }
      if (state.previousoprend == null) {
        return {
          ...state,
          operation: payload.operation,
          previousoprend: state.currentoperand,
          currentoperand: null,
        };
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentoperand == null ||
        state.previousoprend == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousoprend: null,
        operation: null,
        currentoperand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      const newcurrentoperand = state.currentoperand.split(" ").join("");
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentoperand: null,
        };
      }
      if (state.currentoperand == null) return state;
      if (state.currentoperand.length === 1) {
        return { ...state, currentoperand: null };
      }
      if (newcurrentoperand == null) return "";
      return {
        ...state,
        currentoperand: newcurrentoperand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
  }
}
function evaluate({ currentoperand, previousoprend, operation }) {
  const prev = parseFloat(previousoprend.split(" ").join(""));
  const current = parseFloat(currentoperand.split(" ").join(""));
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}
function App() {
  const [{ currentoperand = "0", previousoprend, operation }, dispatch] =
    useReducer(reducer, {});
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-8 bg-slate-400 rounded-2xl">
          <div className="flex flex-col items-end w-full h-12 mb-2 bg-white justify-stretch">
            <div className="flex justify-end pr-2">
              {previousoprend}
              {operation}
            </div>
            <div className="flex justify-end pr-2 text-xl font-bold tracking-tighter">
              {currentoperand}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 ">
            <button
              onClick={() => dispatch({ type: ACTIONS.CLEAR })}
              className="w-20 col-span-2 text-lg font-semibold bg-white rounded-full"
            >
              AC
            </button>
            <button
              onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
              className="text-lg font-semibold bg-white rounded-full"
            >
              DEL
            </button>
            <Operationbutton dispatch={dispatch} operation="÷" />
            <Digitbutton dispatch={dispatch} digit="7" />
            <Digitbutton dispatch={dispatch} digit="8" />
            <Digitbutton dispatch={dispatch} digit="9" />
            <Operationbutton dispatch={dispatch} operation="x" />
            <Digitbutton dispatch={dispatch} digit="4" />
            <Digitbutton dispatch={dispatch} digit="5" />
            <Digitbutton dispatch={dispatch} digit="6" />
            <Operationbutton dispatch={dispatch} operation="-" />
            <Digitbutton dispatch={dispatch} digit="1" />
            <Digitbutton dispatch={dispatch} digit="2" />
            <Digitbutton dispatch={dispatch} digit="3" />
            <Operationbutton dispatch={dispatch} operation="+" />
            <Digitbutton dispatch={dispatch} digit="." />
            <Digitbutton dispatch={dispatch} digit="0" />

            <button
              onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
              className="w-20 col-span-2 text-lg font-semibold bg-white rounded-full "
            >
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
