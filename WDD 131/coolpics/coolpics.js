// coolpics.js
document.addEventListener("DOMContentLoaded", function () {
  // ─── MENU TOGGLE & RESIZE ───────────────────────────────────────────────────
  const menuButton = document.querySelector(".menu-button");
  const menu       = document.querySelector("nav ul");

  menuButton.addEventListener("click", () => {
    menu.classList.toggle("hide");
  });

  function handleResize() {
    // On large screens always show menu; on small hide by default
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // initial check

  // ─── GALLERY MODAL VIEWER ────────────────────────────────────────────────────
  const gallery = document.querySelector(".gallery");
  const modal   = document.getElementById("image-viewer");

  gallery.addEventListener("click", event => {
    const img = event.target.closest("img.thumbnail");
    if (!img) return; // clicked outside an image

    // Build full-size URL (e.g. "norris-sm.jpg" → "norris-full.jpeg")
    const [base]  = img.src.split("-");
    const fullSrc = base + "-full.jpeg";

    // Inject into dialog
    modal.innerHTML = `
      <img src="${fullSrc}" alt="${img.alt}">
      <button class="close-viewer" aria-label="Close viewer">×</button>
    `;
    modal.showModal();

    // Wire up close button
    modal.querySelector(".close-viewer").addEventListener("click", () => {
      modal.close();
    });
  });

  // Close modal when clicking outside the image (on backdrop)
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
