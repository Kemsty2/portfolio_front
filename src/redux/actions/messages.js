import { MessagesActions } from "./types";

export function pendingAdd() {
  return {
    type: MessagesActions.PENDING_ADD
  };
}
export function successAdd(message) {
  return {
    type: MessagesActions.SUCCESS_ADD,
    message
  };
}
export function failAdd(message) {
  return {
    type: MessagesActions.FAILED_ADD,
    message
  };
}
