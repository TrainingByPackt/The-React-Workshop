import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const validate = value => {
  if (value.length <= 5) {
    return true;
  } else {
    return false;
  }
};

const clientSideValidation = value => {
  if (validate(value)) {
    return "All good.";
  } else {
    throw new Error("Value's length is over 5.");
  }
};

const useForm = ({ handler }) => {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "change_value":
          return { ...state, value: action.payload.value };

        case "set_error":
          return {
            ...state,
            error: action.payload.error,
            success: action.payload.error ? false : true
          };

        default:
          return state;
      }
    },
    {
      value: "",
      error: undefined,
      success: false
    }
  );

  return {
    value: state.value,
    changeHandler: e =>
      dispatch({ type: "change_value", payload: { value: e.target.value } }),
    error: state.error,
    success: state.success,
    submitHandler: e => {
      e.preventDefault();

      try {
        handler(state.value);

        dispatch({ type: "set_error", payload: { error: undefined } });
      } catch (e) {
        dispatch({ type: "set_error", payload: { error: e.message } });
      }
    }
  };
};

const Form = () => {
  const { changeHandler, submitHandler, value, error, success } = useForm({
    handler: clientSideValidation
  });

  return (
    <form onSubmit={submitHandler}>
      <input
        value={value}
        onChange={changeHandler}
        placeholder="give me string"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && (
        <div style={{ color: "green" }}>Your submission was successful.</div>
      )}
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Form />, rootElement);
