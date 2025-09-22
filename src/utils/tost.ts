import Toastify from "toastify-js";

/**
 * Reusable toast function
 * @param message - text to display
 * @param type - success | error | info (default: success)
 */
export const showToast = (
  message: string,
  type: "success" | "error" | "info" = "success"
) => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top", // top or bottom
    position: "right", // left, center or right
    backgroundColor:
      type === "success" ? "green" : type === "error" ? "red" : "blue",
  }).showToast();
};
