(function () {
    
  document.documentElement.dataset.dark =
    window.localStorage.getItem("dark-mode") ?? "false";

  const updateCardImagesForTheme = () => {
    const isDark = document.documentElement.dataset.dark === "true";
    document.querySelectorAll('.card-image').forEach(img => {
      const light = img.dataset.imageLight;
      const dark = img.dataset.imageDark;
      const newSrc = isDark ? dark : light;

      if (newSrc && img.src !== new URL(newSrc, window.location.href).href) {
        img.src = newSrc;
      }
    });
  };

  window.addEventListener("load", () => {
    const toggle = document.querySelector(".dark-toggle");
    if (toggle) {
      toggle.checked = document.documentElement.dataset.dark === "true";
    }
    updateCardImagesForTheme();
  });

  window.onDarkToggleChange = (event) => {
    const value = event.target.checked;
    document.documentElement.dataset.dark = value;
    window.localStorage.setItem("dark-mode", value);
    updateCardImagesForTheme();
  };
})();
