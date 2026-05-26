{
  const onLoad = () => {
    document.querySelectorAll("pre").forEach((pre) => {
      const button = document.createElement("button");
      button.className = "copy-btn";
      button.innerHTML = '<i class="fa-solid fa-copy"></i>';
      button.setAttribute("aria-label", "Copy code");
      
      button.onclick = () => {
        navigator.clipboard.writeText(pre.textContent);
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          button.innerHTML = '<i class="fa-solid fa-copy"></i>';
        }, 2000);
      };
      
      pre.parentElement.style.position = "relative";
      pre.parentElement.appendChild(button);
    });
  };
  
  window.addEventListener("load", onLoad);
}
