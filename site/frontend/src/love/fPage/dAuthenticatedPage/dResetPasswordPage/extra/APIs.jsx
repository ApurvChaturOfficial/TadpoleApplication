import { toast } from "react-toastify";
import API from "src/love/aAPI/API";
import clearFormObject from "src/love/dFunction/aClearFormObject";
import loading from "src/love/dFunction/fLoading";
import FinalRouteName from "src/love/gRoute/FinalRouteName";


const APIs = {
  // ResetPassword API
  ResetPasswordAPI: (Redux, navigate, ReduxUltimate, token) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthenticatedAPI.ResetPasswordAPI({
      token,
      data: {
        new_password: Redux.state.FormObject.FormValue.newPassword,
        confirm_password: Redux.state.FormObject.FormValue.confirmPassword,
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        ReduxUltimate.dispatch({ type: ReduxUltimate.action.ExtraObject, payload: {
          ...ReduxUltimate.state.ExtraObject,
          Halchal: !ReduxUltimate.state.ExtraObject?.Halchal || true
        }})
        toast.success(serverResponse.message);
        clearFormObject(Redux)
        navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast.error(serverResponse.message);
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
}

export default APIs