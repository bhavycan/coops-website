gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var tl = gsap.timeline();

tl.from("#name,#name h1,#right-part h1, #logo,#right-part h2", {
  y: -20,
  duration: 1,
});

tl.from("#page1-down h1,#sub-line", {
  y: 10,
  opacity: 0,
  duration: 0.5,
});

tl.from("#page1-down span,#page1-down", {
  color: "#fed766",
});

tl.to("#home-video video", {
  width: "100%",
  height: "100%",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    markers: false,
    start: "top 350",
    end: "top 0",
    scrub: 2,
  },
});

var h2Selector = document.querySelector("#about-us");
var array = Array.from(h2Selector.textContent);
console.log(array);
var cluster = "";
array.forEach((element) => {
  cluster += `<span>${element}</span>`;
  return cluster;
});
h2Selector.innerHTML = cluster;

tl.to("#page3 h1", {
  color: "white",
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 400",
    end: "top -90",
    scrub: 1,
    markers: false,
  },
});

tl.to("#about-us span", {
  fontFamily: "silk serif",
  stagger: 0.5,
  color: "#fed766",
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 400",
    end: "top -90",
    scrub: 1,
    markers: false,
  },
});

tl.to("#page4 img", {
  color: "white",
  x: "-350%",
  scrollTrigger: {
    id: "tokill",
    trigger: "#page4",
    scroller: "#main",
    start: "top 100%",
    end: "top -100%",
    scrub: 1,
    markers: false,
  },
});

tl.from("#page5 img", {
  color: "white",
  x: "-700%",
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 60%",
    end: "top -100%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#page6 img", {
  color: "white",
  x: "-350%",
  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    start: "top 100%",
    end: "top -100%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#skip", {
  x: "260%",
  scrollTrigger: {
    trigger: "#page7",
    scroller: "#main",
    start: "top 40%",
    end: "top -100%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#honk", {
  width: "70%",
  height: "70%",
  opacity: 0,
  scrollTrigger: {
    trigger: "#page7",
    scroller: "#main",
    start: "top 120%",
    end: "top -95%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#page7 h1", {
  webkitTextStroke: "1px #fed766",
  color: "transparent",
  scrollTrigger: {
    trigger: "#page7",
    scroller: "#main",
    start: "top 40%",
    end: "top -20%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#amenities span", {
  fontSize: "3vw",
  color: "#FF8000",
  scrollTrigger: {
    id: "skip-text-kill",
    trigger: "#page7",
    scroller: "#main",
    start: "top 40%",
    end: "top -20%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#page8 h1", {
  color: "transparent",
  fontWeight: "800",
  fontSize: "8vw",
  letterSpacing: "1vw",
  scrollTrigger: {
    id: "page8-title",
    trigger: "#page8",
    scroller: "#main",
    start: "top 40%",
    end: "top 0%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#page8 h2", {
  letterSpacing: "1vw",
  fontSize: "5vw",
  scrollTrigger: {
    id: "page8-title2",
    trigger: "#page8",
    scroller: "#main",
    start: "top 40%",
    end: "top 0%",
    scrub: 1,
    markers: false,
  },
});

tl.to("#page9 h1", {
  color: "transparent",
  letterSpacing: "1vw",
  fontFamily: "gilroy",
  fontSize: "8vw",
  scrollTrigger: {
    id: "page9-title",
    trigger: "#page9",
    scroller: "#main",
    start: "top 40%",
    end: "top 0%",
    scrub: 1,
    markers: false,
  },
});



// create
let mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
mm.add("(max-width: 700px)", () => {
  // this setup code only runs when viewport is at least 700px wide

  ScrollTrigger.getById("tokill").kill(true);
  ScrollTrigger.getById("skip-text-kill").kill(true);
  ScrollTrigger.getById("page8-title").kill(true);
  ScrollTrigger.getById("page8-title2").kill(true);
  ScrollTrigger.getById("page9-title").kill(true);

  tl.to("#amenities span", {
    fontSize: "9vw",
    color: "#FF8000",
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start: "top 40%",
      end: "top -20%",
      scrub: 1,
      markers: false,
    },
  });

  tl.to("#page8 h1", {
    color: "transparent",
    fontWeight: "800",
    letterSpacing: "2vw",
    scrollTrigger: {
      trigger: "#page8",
      scroller: "#main",
      start: "top 40%",
      end: "top 0%",
      scrub: 1,
      markers: false,
    },
  });

  tl.to("#page8 h2", {
    letterSpacing: "1vw",
    scrollTrigger: {
      trigger: "#page8",
      scroller: "#main",
      start: "top 40%",
      end: "top 0%",
      scrub: 1,
      markers: false,
    },
  });

  tl.to("#page9 h1", {
    color: "transparent",
    letterSpacing: "1vw",
    fontFamily: "gilroy",
    scrollTrigger: {
      trigger: "#page9",
      scroller: "#main",
      start: "top 40%",
      end: "top 0%",
      scrub: 1,
      markers: false,
    },
  });
});
