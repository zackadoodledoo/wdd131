// mission.js
document.addEventListener("DOMContentLoaded", function () {
    const themeSelect = document.getElementById("theme-select");
    const body = document.body;
    const logo = document.getElementById("logo");
  
    const lightLogo = "https://i.postimg.cc/ppSGg3jY/byui-logo-blue.webp";
    const darkLogo = "133bc417-2e0f-4224-a2f1-dd40a8ee8b3b.png"; // your uploaded dark logo
  
    themeSelect.addEventListener("change", function () {
      body.classList.remove("light", "dark");
  
      const selectedTheme = themeSelect.value;
      body.classList.add(selectedTheme);
  
      // Switch logo based on theme
      if (selectedTheme === "dark") {
        logo.src = darkLogo;
      } else {
        logo.src = lightLogo;
      }
    });
  });
  