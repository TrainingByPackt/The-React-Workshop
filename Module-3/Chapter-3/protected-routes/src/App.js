import React from 'react';
import { Formik, Form, Field } from 'formik';
import { createBrowserHistory as createHistory } from 'history';
import { Prompt, Link, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}


function App() {
  const history = createHistory({
    getUserConfirmation(message, callback) {
      const allowTransition = window.confirm(message);
      callback(allowTransition);
    }
  });
  return (
    <div className="App">
      <Router
        history={history}>
        <ul>
          <li>
            <Link to="/">Form</Link>
          </li>
          <li>
            <Link to="/Feed">Feed</Link>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/" exact children={<SignupForm />} />
          <Route path="/feed" children={<div>Feed</div>} />
          <IsAuthenticatedRoute exact path="/Dashboard" component={<div>Dashboard</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export const SignupForm = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        username: '',
        email: '',
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched, validateField, validateForm, dirty }) => (
        <Form>
          <Field name="email" validate={validateEmail} />
          {errors.email && touched.email && <div>{errors.email}</div>}

          <Field name="username" validate={validateUsername} />
          {errors.username && touched.username && <div>{errors.username}</div>}
          <button type="button" onClick={() => validateField('username')}>
            Check Username
          </button>
          <button type="button" onClick={() => validateForm()}>
            Validate All
          </button>
          <button type="submit">Submit</button>
          <span>Form is Dirty: {dirty ? "True" : "False"}</span>
          <Prompt
            message={location =>
              `Are you sure you want to go to ${location.pathname}? You will lose all your data!`
            }
            when={dirty}
          />
        </Form>
      )}
    </Formik>
  </div>
);

const authService = {
  isAuthenticated: function () {
    return false;
  }
};

const IsAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authService.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />
);


export default App;

