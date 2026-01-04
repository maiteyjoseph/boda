const video = document.getElementById("introVideo");
const intro = document.getElementById("intro");
const flash = document.getElementById("flash");
const main = document.getElementById("mainContent");

video.addEventListener("ended", () => {
  // flash
  flash.style.opacity = "1";

  setTimeout(() => {
    flash.style.opacity = "0";
    intro.style.display = "none";
    main.classList.remove("hidden");
  }, 300);
});
