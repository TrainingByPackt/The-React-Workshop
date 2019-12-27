import React, { Component } from 'react';
import { Formik } from 'formik';
import './App.css';
import StatusMessage from "./ConnectExample";

class App extends Component {

  render() {
    // And finally, our render method. Nothing too terribly interesting here.
    return (
      <div className="App">
        <Formik
          initialStatus={{isValidating: false}}
          initialValues={{ name: '', password: '', preferences: ['', '']}}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            setStatus({isValidating: true});
            setTimeout(() => {
              console.info(JSON.stringify(values, null, 2));
              setSubmitting(false);
              setStatus({isValidating: false})
            }, 400);
            values.name = "Hello";
          }}
        >
          {({
              values,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={values.name}
                       onChange={handleChange} />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={values.password}
                       onChange={handleChange} />
              </label>
              <input type="submit" value="Login" disabled={isSubmitting}/>
              <input type="text" name="preferences[0]" value={values.preferences[0]}
                     onChange={handleChange} />

              <input type="text" name="preferences[1]" value={values.preferences[1]}
                     onChange={handleChange} />
              Status: <StatusMessage />
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default App;

