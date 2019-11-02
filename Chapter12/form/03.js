import React from "react";

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

const Form = () => {
  const [value, setValue] = React.useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        try {
          let d = clientSideValidation(value);
          console.log(d);
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="give me string"
      />
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default Form;
