import React, { useReducer } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const initState = {
  turnedOn: false,
  tempo: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleCar":
      if (state.tempo === 0) {
        state = {
          ...state,
          turnedOn: !state.turnedOn,
        };
      } else {
        console.error("Car is moving, can't turn off");
      }
      return state;
    case "exelerate":
      if (state.turnedOn && state.tempo < 240) {
        state = {
          ...state,
          tempo: state.tempo + 5,
        };
      } else {
        if (state.tempo === 240) {
          console.log("Maximum Speed");
        } else {
          console.log("car is not turned on");
        }
      }
      return state;
    case "break":
      if (state.tempo > 0) {
        state = {
          ...state,
          tempo: state.tempo - 5,
        };
      } else {
        console.log("Car is stopped");
      }
      return state;
    default:
      console.error("Invalid action");
      return state;
  }
};

export default function Car() {
  const [state, dispatch] = useReducer(reducer, initState);
  const intervalRef = React.useRef(null);

  const startAction = (type) => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => dispatch({ type }), 50);
  };

  const stopAction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="car">
      {!state.turnedOn ? (
        <p>Turned off</p>
      ) : (
        <ReactSpeedometer
          value={state.tempo}
          minValue={0}
          maxValue={240}
          currentValueText={`${state.tempo} km/h`}
          needleTransitionDuration={100}
        />
      )}
      <div>
        <button onClick={() => dispatch({ type: "toggleCar" })}>
          {state.turnedOn ? "turned off" : "turned on"}
        </button>
        <button
          onMouseDown={() => startAction("exelerate")}
          onMouseUp={() => stopAction()}
          onMouseLeave={() => stopAction()}
        >
          Gas
        </button>
        <button
          onMouseDown={() => startAction("break")}
          onMouseUp={() => stopAction()}
          onMouseLeave={() => stopAction()}
        >
          Break
        </button>
      </div>
    </div>
  );
}
