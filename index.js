const videoThumbs = document.querySelectorAll(".main__adventure-video");

const modal = document.querySelector(".modal");
const modalVideo = document.querySelector(".modal__preview");
const closeButton = document.querySelector(".modal__close-btn");

let lastFocusedElement = null;

// OPEN MODAL
function openModal(thumb) {
  const videoSource = thumb.dataset.video;

  if (!videoSource) {
    console.error("No video source found for this thumbnail.");
    return;
  }

  lastFocusedElement = thumb;

  modalVideo.src = videoSource;
  modal.classList.add("modal_opened");
  modal.setAttribute("aria-hidden", "false");

  closeButton.focus();

  modalVideo.load();

  modalVideo.play().catch(() => {
    // The user can still start playback using the video controls.
  });
}

// CLOSE MODAL
function closeModal() {
  modal.classList.remove("modal_opened");
  modal.setAttribute("aria-hidden", "true");

  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute("src");
  modalVideo.load();

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// OPEN MODAL FROM VIDEO THUMBNAILS
videoThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    openModal(thumb);
  });
});

// CLOSE BUTTON
closeButton.addEventListener("click", closeModal);

// CLOSE WHEN CLICKING OUTSIDE MODAL CONTENT
modal.addEventListener("click", (evt) => {
  if (evt.target === modal) {
    closeModal();
  }
});

// CLOSE WITH ESCAPE KEY
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape" && modal.classList.contains("modal_opened")) {
    closeModal();
  }
});
