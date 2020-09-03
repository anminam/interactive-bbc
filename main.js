(() => {
  const stepEls = document.querySelectorAll(".step");
  const graphicEls = document.querySelectorAll(".graphic-item");
  let currentItem = graphicEls[0]; // 현재 활성화된 그림
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index;
    console.log(ioIndex, ioIndex * 1);
  });

  stepEls.forEach((el, i) => {
    io.observe(el);
    el.dataset.index = i;
  });
  graphicEls.forEach((el, i) => {
    el.dataset.index = i;
  });

  function active() {
    currentItem.classList.add("visible");
  }

  function inactive() {
    currentItem.classList.remove("visible");
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      // for (let i = 0; i < stepEls.length; i++) {
      step = stepEls[i];
      if (!step) {
        continue;
      }

      boundingRect = step.getBoundingClientRect();
      //   console.log(boundingRect.top, i);

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactive();
        currentItem = graphicEls[step.dataset.index];
        active();
      }
    }
  });

  active();
})();
