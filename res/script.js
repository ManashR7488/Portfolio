function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();




///////////////// GSAP /////////////////////





let run = gsap.timeline();

run.from(".nav h3 span", {
  delay: 0.5,
  y: -20,
  opacity: 0,
  stagger: 0.2,
});
run.from(".nav .nav-menu", {
  opacity: 0,
});
run.from(".nav ul .man", {
  y: -20,
  opacity: 0,
  stagger: 0.2,
});
run.from(".page1", {
  opacity: 0,
  duration: 1,
});
run.from(".card-text h2", {
  opacity: 0,
  y: -100,
  duration: 0.5,
});
run.from(".card-text h1", {
  opacity: 0,
  y: -100,
  duration: 0.5,
});
run.from(".scrollicn", {
  opacity: 0,
  y: 100,
  duration: 0.2,
});
run.from(".page2", {
  opacity: 0,
  duration: 0.2,
});

gsap.to(".nav", {
  height: "10vh",
  backgroundColor: "#000000ea",
  scrollTrigger: {
    trigger: ".nav",
    scroller: ".main",
    start: "top -2%",
    end: "top -10%",
    scrub: 1,
  },
});
gsap.from(".page2-inner-scroll", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".page2-inner-scroll",
    scroller: ".main",
    start: "top 93%",
    end: "top 40%",
    scrub: 0.2,
  },
});
gsap.from(".skill .images img",{
  opacity: 0.2,
  x:-50,
  rotate:"20deg",
  stagger:0.22,
  scrollTrigger:{
    trigger: ".skill .images img",
    scroller: ".main",
    markers: false,
    start: "top 93%",
    end: "top 40%",
  }
})

let tl = gsap.timeline();

tl.to(".main",{
  backgroundColor:"#ffe4c4",
  scrollTrigger:{
    trigger:".page4 .contacts",
    scroller:".main",
    start:"top 60%",
    end:"top 40%",
    scrub:2,
  }
})



////////////////////     js     //////////////////////////



let menuBtn = document.querySelector(".nav-menu");
menuBtn.innerHTML = `<i class="ri-menu-5-line"></i>`;
let sidebar = document.querySelector(".sidemenu");
let nav = document.querySelector(".nav");
let drop = document.querySelector("#hero-con");
let dropArrow = document.querySelector("#dropArrow");
let menustate = false;
let i = document.querySelector(".ri-arrow-right-double-fill");

let connect = document.querySelector("#con");
let media = document.querySelectorAll(".media a");

let page2TextH1 = document.querySelectorAll(".text-info h1");

menuBtn.addEventListener("click", () => {
  menustate = !menustate;
  if (menustate) {
    sidebar.style.transform = "translateX(0)";
    sidebar.style.opacity = 1;
    menuBtn.style.borderColor = "#000";
    menuBtn.innerHTML = `<i class="ri-arrow-right-double-fill"></i>`;
    let i = document.querySelector(".ri-arrow-right-double-fill");
    i.setAttribute("class", "ri-arrow-right-double-fill zigzig");
  } else {
    sidebar.style.transform = "translateX(100%)";
    sidebar.style.opacity = 0;
    media.forEach(function (elem) {
      elem.removeAttribute("class", "media-ani");
      menuBtn.style.borderColor = "#f9b490";
      menuBtn.innerHTML = `<i class="ri-menu-5-line"></i>`;
    });
  }
});

connect.addEventListener("click", () => {
  media.forEach(function (elem) {
    elem.setAttribute("class", "media-ani");
  });
  setTimeout(() => {
    media.forEach(function (elem) {
      elem.removeAttribute("class", "media-ani");
    });
  }, 5000);
});

drop.addEventListener("mouseover", () => {
  dropArrow.style.transform = "rotate(-90deg)";
});
drop.addEventListener("mouseleave", () => {
  dropArrow.style.transform = "rotate(0deg)";
});



page2TextH1.forEach(function(line){
  let clutter = '';
  line.textContent.split(" ").forEach(function(elem){
      clutter += `<div class="ds">${elem}</div>`;
      line.innerHTML = clutter;
  })
})

document.querySelectorAll(".ds").forEach(function(elem){
  cl = '';
  elem.textContent.split("").forEach(function(alpha){
    cl += `<span class="dsSp">${alpha}</span>`;
    elem.innerHTML = cl;
  })
});

gsap.to(".dsSp",{
  color: "#f9b590",
  stagger:1.5,
  scrollTrigger:{
    trigger: ".dsSp",
    scroller: ".main",
    start: "top 78%",
    end: "top -100vh",
    scrub: 1.5,
  }
})



  let tex1 = '';
  document.querySelector(".text-box h1").textContent.split(" ").forEach(function(elem){
      tex1 += `<div class="tx1" style="display:flex;">${elem}</div>`;
      document.querySelector(".text-box h1").innerHTML = tex1;
  })


document.querySelectorAll(".tx1").forEach(function(elem){
  cl = '';
  elem.textContent.split("").forEach(function(alpha){
    cl += `<span class="tx1Sp">${alpha}</span>`;
    elem.innerHTML = cl;
  })
});
for(let i = 9; i <= 12; i++){
  document.querySelectorAll(".tx1Sp")[i].style.color = "#2ed6dc";
}

gsap.from(".page3 .text-box h1 div span",{
  y: 20,
  opacity: 0,
  stagger:0.5,
  scrollTrigger: {
    trigger: ".page3 .text-box h1 div span",
    scroller: ".main",
    end: "top 85%",
    scrub: 2,
  }
})


let tex2 = '';
  document.querySelector(".text-box h5").textContent.split(" ").forEach(function(elem){
      tex2 += `<div class="tx2" style="display:flex;">${elem}</div>`;
      document.querySelector(".text-box h5").innerHTML = tex2;
  })


document.querySelectorAll(".tx2").forEach(function(elem){
  cl = '';
  elem.textContent.split("").forEach(function(alpha){
    cl += `<span class="tx2Sp">${alpha}</span>`;
    elem.innerHTML = cl;
  })
});
for(let i = 0; i <= 5; i++){
  document.querySelectorAll(".tx2Sp")[i].style.color = "#2ed6dc";
}

gsap.from(".page3 .text-box h5 div span",{
  y: 20,
  opacity: 0,
  stagger:0.3,
  scrollTrigger: {
    trigger: ".page3 .text-box h5 div span",
    scroller: ".main",
    end: "top 90%",
    scrub: 1,
  }
})