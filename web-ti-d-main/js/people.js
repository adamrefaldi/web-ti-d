const wrapper = document.querySelector(".peopleWrapper");
const peopleCarousel = document.querySelector(".peopleCarousel");
const arrowBtns = document.querySelectorAll(".peopleWrapper i");
const firstCardWidth = peopleCarousel.querySelector(".peopleCard").offsetWidth;
const carouselChildrens = [...peopleCarousel.children];

let cardPerView = Math.round(peopleCarousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    peopleCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    peopleCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

let isDragging = false, startX, startScrollLeft, timeoutId;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        peopleCarousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    peopleCarousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = peopleCarousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    peopleCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    peopleCarousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => peopleCarousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    if(peopleCarousel.scrollLeft === 0) {
        peopleCarousel.classList.add("no-transition");
        peopleCarousel.scrollLeft = peopleCarousel.scrollWidth - (2 * peopleCarousel.offsetWidth);
        peopleCarousel.classList.remove("no-transition");
    } 
    
    else if(Math.ceil(peopleCarousel.scrollLeft) === peopleCarousel.scrollWidth - peopleCarousel.offsetWidth) {
        peopleCarousel.classList.add("no-transition");
        peopleCarousel.scrollLeft = peopleCarousel.offsetWidth;
        peopleCarousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

peopleCarousel.addEventListener("mousedown", dragStart);
peopleCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
peopleCarousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);