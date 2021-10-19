import { useEffect, useState } from "react";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
//import { authenticateUser } from "../../redux/actions/userAction";
import { authenticateUser } from "../../redux/actions/userAction_toolkit";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import {
  selectUserIsLoggedIn,
  selectUserIsLoading,
  selectUserIsError,
} from "../../redux/selectors/user.selector";

const AuthForm = () => {
  //const error = useSelector((state) => state.login.error);
  //const authToken = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState();
  //const enteredEmailRef = useRef();
  //const enteredPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const state = useSelector((state) => state);
  // const {
  //   error: isError,
  //   isLoading,
  //   isLoggedIn,
  // } = useSelector((state) => state.users);
  //const  = useSelector((state) => state.users.isLoggedIn);

  useEffect(() => {
    if (selectUserIsLoggedIn(state)) {
      history.push("/profile");
    }
  }, [state, history]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailInputHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //const enteredEmail = enteredEmailRef.current.value;
    //const enteredPassword = enteredPasswordRef.current.value;
    dispatch(authenticateUser(enteredEmail, enteredPassword));
  };
  return (
    <section className={classes.auth}>
      {selectUserIsError(state) && (
        <Alert severity="error">{selectUserIsError(state)}</Alert>
      )}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            //ref={enteredEmailRef}
            onChange={emailInputHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passwordInputHandler}
            // ref={enteredPasswordRef}
          />
        </div>
        <div className={classes.actions}>
          {!selectUserIsLoading(state) && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {selectUserIsLoading(state) && <CircularProgress size={50} />}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;