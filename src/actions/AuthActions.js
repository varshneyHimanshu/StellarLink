import toast from "react-hot-toast";
import * as AuthApi from "../api/AuthRequests";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
    toast.success("Login Successful");
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
    toast.error("No User Found");
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
    toast.success("Sign Up Successfully Completed");
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
    toast.error("There is error in signing Up");
  }
};


export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}
