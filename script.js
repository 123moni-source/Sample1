var prev = document.querySelector(".prev");
      var next = document.querySelector(".next");
      var images = document.querySelector(".carousel-container").children;
      totalImages = images.length;

      var index = 0;
      prev.addEventListener("click", () => {
        nextImage("prev");
      });

      next.addEventListener("click", () => {
        nextImage("next");
      });

      // check for updated index value
      function nextImage(direction) {
        if (direction == "next") {
          index++;
          if (index == totalImages) {
            index = 0;
          }
        } else {
          if (index == 0) {
            index = totalImages - 1;
          } else {
            index--;
          }
        }

        for (let i = 0; i < totalImages; i++) {
          images[i].classList.remove("main");
        }
        images[index].classList.add("main");
      }

      function autoMove() {
        setInterval(() => {
          nextImage("next");
        }, 3000);
      }

      window.onload = autoMove;






      