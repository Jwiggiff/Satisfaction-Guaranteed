/* COLORS */
(function () {
  function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  }
  document.documentElement.style = `
  --blockColor: ${randomColor()};
  --seaColor: ${randomColor()};
  --gooColor: ${randomColor()};
  --flipFrontColor: ${randomColor()};
  --flipBackColor: ${randomColor()};
  --dotColor: ${randomColor()};
`;
})();

/* BLOCKS */
(function () {
  const blocksEl = document.querySelector("#blocks");
  for (let i = 0; i < 24; i++) {
    const container = document.createElement("div");
    container.classList.add("block-container");
    const block = document.createElement("div");
    block.classList.add("block");
    container.appendChild(block);
    blocksEl.appendChild(container);
  }
  blocksEl.addEventListener("touchmove", (e) => {
    let currentEl = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    currentEl.classList.add("hover");
    currentEl.parentNode.childNodes.forEach((el) => {
      if (el != currentEl) el.classList.remove("hover");
    });
  });
  blocksEl.addEventListener("touchend", (e) => {
    blocksEl.childNodes.forEach((el) => el.classList.remove("hover"));
  });
})();

/* SPLIT THE SEA */
(function () {
  const seaEl = document.querySelector("#split-the-sea");
  for (let i = 0; i < 24; i++) {
    const container = document.createElement("div");
    container.classList.add("block-container");
    const blockTop = document.createElement("div");
    blockTop.classList.add("block");
    blockTop.classList.add("top");
    container.appendChild(blockTop);
    const blockBot = document.createElement("div");
    blockBot.classList.add("block");
    blockBot.classList.add("bottom");
    container.appendChild(blockBot);
    seaEl.appendChild(container);
  }
  seaEl.addEventListener("touchmove", (e) => {
    let currentEl = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    currentEl.classList.add("hover");
    currentEl.parentNode.childNodes.forEach((el) => {
      if (el != currentEl) el.classList.remove("hover");
    });
  });
  seaEl.addEventListener("touchend", (e) => {
    seaEl.childNodes.forEach((el) => el.classList.remove("hover"));
  });
})();

/* GOO */
(function () {
  let mouseX = 0;
  let mouseY = 0;
  let xp = 0;
  let yp = 0;
  const mouse = document.querySelector("#mouse");
  const gooEl = document.querySelector("#goo");
  window.addEventListener("load", () => {
    mouseX = gooEl.offsetWidth / 2 - 30;
    mouseY = gooEl.offsetHeight - 80;
  });
  gooEl.addEventListener("mousemove", (e) => {
    mouseX = e.offsetX - 30;
    mouseY = e.offsetY - 30;
  });
  gooEl.addEventListener("mouseleave", (e) => {
    mouseX = e.target.offsetWidth / 2 - 30;
    mouseY = e.target.offsetHeight - 80;
  });
  gooEl.addEventListener("touchmove", (e) => {
    e.preventDefault();
    mouseX = e.touches[0].clientX - e.target.offsetLeft - 30;
    mouseY = e.touches[0].clientY - e.target.offsetTop - 30;
  });
  gooEl.addEventListener("touchend", (e) => {
    mouseX = e.target.offsetWidth / 2 - 30;
    mouseY = e.target.offsetHeight - 80;
  });
  setInterval(() => {
    xp += (mouseX - xp) / 6;
    yp += (mouseY - yp) / 6;
    mouse.style.left = xp + "px";
    mouse.style.top = yp + "px";
  }, 20);
})();

/* FLIP */
(function () {
  const flipEl = document.querySelector("#flip");
  for (let i = 0; i < 24; i++) {
    const container = document.createElement("div");
    container.classList.add("block-container");
    const block = document.createElement("div");
    block.classList.add("block");
    container.appendChild(block);
    flipEl.appendChild(container);
  }

  let lastContainer;
  document.querySelectorAll("#flip .block-container").forEach((container) => {
    container.addEventListener("mouseenter", (e) => {
      container.classList.toggle("flip");
    });
    container.addEventListener("touchmove", (e) => {
      const currentContainer = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
      if (currentContainer != lastContainer)
        currentContainer.classList.toggle("flip");
      lastContainer = currentContainer;
    });
  });
})();

/* DOTS */
(function () {
  const dotsEl = document.querySelector("#dots");
  for (let i = 0; i < 24; i++) {
    const container = document.createElement("div");
    container.classList.add("dot-container");
    const dotTop = document.createElement("div");
    dotTop.classList.add("dot");
    dotTop.classList.add("top");
    container.appendChild(dotTop);
    const dotBot = document.createElement("div");
    dotBot.classList.add("dot");
    dotBot.classList.add("bottom");
    container.appendChild(dotBot);
    dotsEl.appendChild(container);
  }
  const mouseEl = document.createElement("span");
  mouseEl.id = "mouse";
  dotsEl.appendChild(mouseEl);

  let mouseX = 0;
  let xp = 0;
  dotsEl.addEventListener("mousemove", (e) => {
    mouseX =
      e.target == dotsEl
        ? e.offsetX - 15
        : e.target.offsetLeft + e.offsetX - 15;
  });
  dotsEl.addEventListener("touchmove", (e) => {
    mouseX = e.touches[0].clientX - 15;
    let currentEl = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    currentEl.classList.add("hover");
    currentEl.parentNode.childNodes.forEach((el) => {
      if (el != currentEl) el.classList.remove("hover");
    });
  });
  dotsEl.addEventListener("touchend", (e) => {
    dotsEl.childNodes.forEach((el) => el.classList.remove("hover"));
  });
  setInterval(() => {
    xp += (mouseX - xp) / 3;
    mouseEl.style.left = xp + "px";
  }, 20);
})();
