const peopleCarousel = document.querySelector(".peopleCarousel");
const arrowBtns = document.querySelectorAll(".peopleWrapper i");
const firstCardWidth = peopleCarousel.querySelector(".peopleCard").offsetWidth;

let isDragging = false, startX, startScrollLeft;

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

const dragStop = (e) => {
    isDragging = false;
    peopleCarousel.classList.remove("dragging");
}

peopleCarousel.addEventListener("mousedown", dragStart);
peopleCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);