(() => {
  const actions = {
    birdFiles(isKey) {
      if (isKey) {
        document.querySelector(
          '[data-index="1"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="1"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
    birdFiles2(isKey) {
      if (isKey) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };
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

  function active(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }

  function inactive(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
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
        inactive(currentItem.dataset.action);
        currentItem = graphicEls[step.dataset.index];
        active(currentItem.dataset.action);
      }
    }
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  });

  active();
})();
