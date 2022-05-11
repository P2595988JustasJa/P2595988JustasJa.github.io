var title = document.querySelector("h1");
if (title) {
  title.addEventListener("mouseenter", () => {
    gsap.to(".distort feDisplacementMap", 1, {
      attr: {
        scale: 100
      },
      ease: "circ.out"
    });
    gsap.to(
      ".distort feTurbulence",
      1, {
        attr: {
          baseFrequency: "2.08 .08"
        },
        ease: "circ.out"
      },
      1
    );
    gsap.to(title, 1, {
      fontVariationSettings: "'wght' 650",
      ease: "back.out"
    });
  });
  title.addEventListener("mouseleave", () => {
    gsap.to(
      ".distort feDisplacementMap",
      1, {
        attr: {
          scale: 0
        },
        ease: "circ.out"
      },
      1
    );
    gsap.to(
      ".distort feTurbulence",
      1, {
        attr: {
          baseFrequency: "2.01 .01"
        },
        ease: "circ.out"
      },
      1
    );
    gsap.to(
      title,
      1, {
        fontVariationSettings: "'wght' 700",
        ease: "back.out"
      },
      1
    );
  });
}


var javascript = new Vue({
  el: "#banksy",
  data() {
    return {
      shredding: null,
      dropping: null
    };
  },
  methods: {
    shred() {
      this.shredding = anime({
        targets: "#original",
        height: 0,
        duration: 10000,
        easing: "linear"
      });

      this.dropping = anime({
        targets: "#painting",
        translateY: "101%",
        duration: 10000,
        easing: "linear"
      });
    },
    artSelected(e) {
      this.shredding.pause();
      this.dropping.pause();
      // lets anyone put their image into the animation //
      loadImage(
        e.target.files[0],
        (canvas) => {
          let url = canvas.toDataURL("image/jpeg");

          document.getElementById(
            "original"
          ).style.backgroundImage = `url(${url})`;

          let elements = Array.from(document.getElementsByClassName("shred"));

          elements.forEach((element) => {
            element.style.backgroundImage = `url(${url})`;
          });

          document.getElementById("original").style.height = "100%";
          document.getElementById("painting").style.transform = "translateY(0)";

          this.shred();
        }, {
          canvas: true,
          crop: true,
          maxHeight: 566,
          maxWidth: 392,
          orientation: true
        }
      );
    }
  },
  mounted() {
    this.shred();
  }
});
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
