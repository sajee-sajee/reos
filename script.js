// Fade in animation for scroll
document.addEventListener("DOMContentLoaded", () => {
    const memories = document.querySelectorAll(".memory");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    memories.forEach(memory => observer.observe(memory));

    // Floating hearts effect
    setInterval(createHeart, 500);
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    const colors = ["❤️", "💖", "💘", "💕", "💞"];
    heart.innerText = colors[Math.floor(Math.random() * colors.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Logic for proposing
const btnNo = document.getElementById("btn-no");
const btnYes = document.getElementById("btn-yes");
const funnyResponse = document.getElementById("funny-response");
const buttonsContainer = document.querySelector(".buttons");
const proposalSect = document.querySelector(".proposal");

const noMessages = [
    "Are you sure?",
    "Think again!",
    "Pretty please?",
    "Don't do this to me!",
    "I'll buy you food!",
    "I'm going to cry...",
    "Why are you so mean?",
    "You misclicked, right?",
    "Give it another thought!",
    "Heart = Broken 💔",
    "Please say yes :("
];

let noClickCount = 0;
let yesScale = 1;

btnNo.addEventListener("click", () => {
    // Change text of No button
    const randomIndex = Math.floor(Math.random() * (noMessages.length));
    btnNo.innerText = noMessages[noClickCount % noMessages.length];

    // Grow Yes button
    yesScale += 0.3;
    btnYes.style.transform = `scale(${yesScale})`;

    // Randomly move the No button if clicked too many times
    if (noClickCount > 2) {
        moveButton();
    }

    noClickCount++;
});

function moveButton() {
    const maxW = window.innerWidth - btnNo.offsetWidth - 20;
    const maxH = window.innerHeight - btnNo.offsetHeight - 20;

    // get a random x and y that's inside the viewport
    const x = Math.max(20, Math.random() * maxW) - (window.innerWidth / 2 - btnNo.offsetWidth / 2);
    const y = Math.max(20, Math.random() * maxH) - (window.innerHeight / 2 - btnNo.offsetHeight / 2);

    btnNo.style.position = "absolute";
    btnNo.style.transition = "all 0.3s ease";
    btnNo.style.transform = `translate(${x}px, ${y}px)`;
}

// For desktop: dodge cursor slightly if they try to hover (after some clicks)
btnNo.addEventListener("mouseover", () => {
    if (noClickCount > 3) {
        moveButton();
    }
});

btnYes.addEventListener("click", () => {
    // Hide buttons, show funny response
    buttonsContainer.style.display = "none";
    document.querySelector(".proposal h1").style.display = "none";
    document.querySelector(".proposal .question").style.display = "none";
    funnyResponse.classList.remove("hidden");
    proposalSect.classList.add("success");

    // Create lots of hearts!
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, Math.random() * 2000);
    }
});
