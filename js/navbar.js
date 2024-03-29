const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      navbar = document.querySelector(".navbar"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");
      let getMode = localStorage.getItem("mode");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }

      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }
      });
        searchToggle.addEventListener("click" , () =>{
        searchToggle.classList.toggle("active");
      });
      
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});
body.addEventListener("click" , e =>{
    let clickedElm = e.target;
    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});

let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  () => {
    var { scrollY } = window;
    if (scrollY > lastScrollTop) {
      navbar.classList.remove("visible");
    } else if (scrollY < lastScrollTop) {
      navbar.classList.add("visible");
    }
    lastScrollTop =
      scrollY <= 0 ? 0 : scrollY;
  },
  { passive: true }
)
