// Homepage Image
const homepagePics = ["5", "4", "1"];
// const homepagePics = ["5", "4", "2", "3", "1"];
const homepageBackground = document.querySelector(".home__background");
const leftButton = document.querySelector(".home__button--left");
const rightButton = document.querySelector(".home__button--right");

let currentIndex = 0;

// Preload images
const preloadedImages = [];
homepagePics.forEach((pic) => {
  const img = new Image();
  img.src = `../images/Homepage/small pic ${pic}.jpg`;
  preloadedImages.push(img);
});

function updateBackground() {
  homepageBackground.style.backgroundImage = `url("../images/Homepage/small pic ${homepagePics[currentIndex]}.jpg")`;
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + homepagePics.length) % homepagePics.length;
  updateBackground();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % homepagePics.length;
  updateBackground();
}

leftButton.addEventListener("click", showPreviousImage);
rightButton.addEventListener("click", showNextImage);

setInterval(() => {
  showNextImage();
}, 6500);

updateBackground();

// Navigation Page
const navigationPanel = document.getElementById("navigation");
const navMenuBtn = document.querySelector(".img__menu--btn");
const navigationExitBtn = document.querySelector(".navigation__exit");
const navLinks = document.querySelectorAll(".navigation__list--link");

const launchNavPanel = function () {
  navMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigationPanel.classList.remove("navigation--hide");
  });
};

const closeNavPanel = function () {
  navigationPanel.classList.add("navigation--hide");
};

const exitNavPanel = function () {
  navigationExitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeNavPanel();
  });
};

const clickNavLinks = function () {
  navLinks.forEach((link) => link.addEventListener("click", closeNavPanel));
};

const initNavFxs = function () {
  launchNavPanel();
  exitNavPanel();
  clickNavLinks();
};

initNavFxs();

// Reveal Sections
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});
const allSections = document.querySelectorAll(".section");

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Gallery Page
/*
const galleryNavLink = document.querySelectorAll(".link--gallery");
const mainField = document.getElementById("main");
const galleryPage = document.getElementById("gallery");
const galleryGrid = document.querySelector(".gallery__grid");
const galleryExitBtn = document.querySelector(".gallery__back--cta");

const createGalleryPage = function () {
  const totalGalleryImages = 12;
  const galleryMarkupArr = [];
  for (let i = 0; i < totalGalleryImages; i++) {
    const markup = ` <figure class="gallery__grid--pic">
          <img src="images/Gallery/pic ${
            i + 1
          }.jpeg" alt="Pre-Wedding Pictures" />
        </figure>`;

    galleryMarkupArr.push(markup);
  }

  const finalMarkup = galleryMarkupArr.join("");
  galleryGrid.innerHTML = "";
  galleryGrid.insertAdjacentHTML("beforeend", finalMarkup);
  galleryPage.style.display = "none";
};

const scrollToTop = async function () {
  window.scrollTo(0, 0);
};

const loadGalleryPage = async function () {
  await scrollToTop();
  mainField.style.display = "none";
  galleryPage.style.display = "block";
};

const closeGalleryPage = async function () {
  galleryPage.style.display = "none";
  await scrollToTop();
  mainField.style.display = "block";
};

const openGallery = function () {
  galleryNavLink.forEach((link) =>
    link.addEventListener("click", () => {
      closeNavPanel();
      loadGalleryPage();
    })
  );
};

const closeGallery = function () {
  galleryExitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeGalleryPage();
  });
};

const initGalleryLinks = function () {
  createGalleryPage();
  openGallery();
  closeGallery();
};

initGalleryLinks();
*/

// Form to Google Sheets

const formSubmitBtn = document.querySelector(".rsvp__form--submit");
const formSubmitted = document.querySelector(".rsvp__submitted");
const rsvpForm = document.querySelector(".rsvp__form--form");

const googleSheetsUrl =
  "https://script.google.com/macros/s/AKfycbxKLaVq0o6M8KhYy1zOTcovAaoHkU6zmVPIePngsrsOAAYCgmhRs_yTIaq5GzltvOeP/exec";

const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }

  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex"; // Display overlay

  try {
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      body: new FormData(form),
    });
    overlay.style.display = "none";
    console.log("Success!", response);
    rsvpForm.style.display = "none";
    formSubmitted.style.display = "flex";
  } catch (error) {
    overlay.style.display = "none";
    console.error("Error!", error.message);
  }
});

function validateForm() {
  const name = document.getElementById("form-name").value;
  const phone = document.getElementById("form-phone").value;
  const email = document.getElementById("form-email").value;
  const pax = document.getElementById("form-pax").value;
  const affiliation = document.querySelector(
    'input[name="Affiliation"]:checked'
  );

  // Validate Full Name
  if (name.trim() === "") {
    alert("Full Name is required");
    return false;
  }

  // Validate Phone No
  const phonePattern = /^\d{10,11}$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number must be 10 or 11 digits.");
    return false;
  }

  // Validate Email Address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Validate Pax
  const paxPattern = /^[1-9]\d*$/;
  if (!paxPattern.test(pax)) {
    alert("Please enter a valid number for No. of Pax.");
    return false;
  }

  // Validate Affiliation Radio Button
  if (!affiliation) {
    alert("Please select an affiliation.");
    return false;
  }

  return true; // If all validations pass
}

// Prevent Page From Jumping
// Get all input fields
const inputFields = document.querySelectorAll("input");

// Function to handle focus event on input fields
function handleInputFocus() {
  // Scroll to the focused input field
  this.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
}

// Attach event listener to each input field
inputFields.forEach((input) => {
  input.addEventListener("focus", handleInputFocus);
});

// Background music
const musicIcon = document.querySelector(".music__btn--icon");

const musicBtn = document.querySelector(".music__btn");

let playMusic = false;

const audio = new Audio("../images/background-music.mp3");
audio.loop = true;
audio.volume = 0.5;
audio.currentTime = 11;

const turnMusicOn = function () {
  audio.muted = false;
  audio.play();
};

const turnMusicOff = function () {
  audio.pause();
};

musicBtn.addEventListener("click", (e) => {
  e.preventDefault();

  playMusic = !playMusic;

  if (playMusic) {
    turnMusicOn();
  } else {
    turnMusicOff();
  }
});
