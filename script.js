const intro = document.getElementById("intro");
const flash = document.getElementById("flash");
const main  = document.getElementById("mainContent");

function attachIntroListener(videoId) {
  const video = document.getElementById(videoId);
  if (!video) return; // if that video doesn't exist, skip

  video.addEventListener("ended", () => {
    // flash
    flash.style.opacity = "1";

    setTimeout(() => {
      flash.style.opacity = "0";
      intro.style.display = "none";
      main.classList.remove("hidden");
    }, 300);
  });
}

// Attach the listener to both possible videos
attachIntroListener("introVideoDesktop");
attachIntroListener("introVideoMobile");
