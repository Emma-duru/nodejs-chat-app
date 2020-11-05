// Get the modal
const modal = document.querySelector("#myModal");
const nicknameInput = document.querySelector("#nickname-input");

// Close the modal when nick-name is typed
nicknameInput.onkeypress = (e) => {
  let keycode = e.keycode ? e.keycode : e.which;
  if (keycode === "13") {
    modal.style.display = "none";
  }
};
