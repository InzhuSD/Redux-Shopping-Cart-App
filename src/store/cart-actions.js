import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const response = await fetch(
        "https://redux-http-6073a-default-rtdb.europe-west1.firebasedatabase.app/cartItems.json"
      );
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: false,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      // Send state as Sending request

      const response = await fetch(
        "https://redux-http-6073a-default-rtdb.europe-west1.firebasedatabase.app/cartItems.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request To Database Successfully",
          type: "success",
        })
      );

      const data = await response.json();
      // Send state as Request is successful
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: false,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};
