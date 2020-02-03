import {MessagesActions} from '../actions/types';
import { toast } from "react-toastify";

const initialState = {
  message: "",
  status: "",
  type: ""
};

export const messagesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case MessagesActions.SUCCESS_ADD:
      if (action.message) toast.success(action.message);
      return {
        ...state,
        status: "success",
        message: action.message,
        messagetype: action.messagetype ? action.messagetype : ""
      };

    case MessagesActions.FAILED_ADD:
      if (action.message && !action.messagetype) toast.error(action.message);
      return {
        ...state,
        status: "fail",
        messagetype: action.messagetype ? action.messagetype : "",
        message: action.message
      };

    case MessagesActions.PENDING_ADD:
      if(action.message) toast.info(action.message);
      return {
        ...state,
        status: "pending",
        message: action.message
      };

    case MessagesActions.RESET_MESSAGE_STORE:
      return {
        ...state,
        status: "",
        message: ""
      };

    default:
      return state;
  }
};
