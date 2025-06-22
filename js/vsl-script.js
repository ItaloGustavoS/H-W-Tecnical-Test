// -----------------------------------------------------------------------------
// YouTube Player API Integration
// -----------------------------------------------------------------------------

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
const VIDEO_ID = "jfKfPfyJRdk"; // Example: Lo-Fi Girl
const TIME_TO_SHOW_CONTENT_SEC = 1214; // 20 minutes and 14 seconds

/**
 * This function creates an <iframe> (and YouTube player)
 * after the API code downloads.
 */
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: VIDEO_ID,
    playerVars: {
      playsinline: 1,
      autoplay: 1, // Autoplay might be blocked by browsers
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

/**
 * The API will call this function when the video player is ready.
 * @param {YT.PlayerEvent} event - The event object.
 */
function onPlayerReady(event) {
  // event.target.playVideo(); // Optional: if autoplay fails
  console.log("YouTube Player is ready.");
}

// -----------------------------------------------------------------------------
// Content Visibility Logic
// -----------------------------------------------------------------------------

let videoProgressCheckIntervalId;
let hasContentBeenShown = false;

/**
 * Handles player state changes. Specifically, monitors video playback
 * to reveal hidden content at a designated time.
 * @param {YT.OnStateChangeEvent} event - The event object.
 */
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !hasContentBeenShown) {
    videoProgressCheckIntervalId = setInterval(() => {
      const currentTime = player.getCurrentTime();
      if (currentTime >= TIME_TO_SHOW_CONTENT_SEC) {
        showHiddenContent();
        clearInterval(videoProgressCheckIntervalId);
        hasContentBeenShown = true;
      }
    }, 1000); // Check every second
  } else {
    clearInterval(videoProgressCheckIntervalId);
  }
}

/**
 * Shows the main content of the page and initializes related features
 * like offer cloning and countdown timers.
 */
function showHiddenContent() {
  const initialContentElement = document.getElementById(
    "references-before-video"
  );
  const afterVideoContentElement = document.getElementById(
    "after-video-content"
  );

  if (initialContentElement) initialContentElement.style.display = "none";
  if (afterVideoContentElement)
    afterVideoContentElement.style.display = "block";

  cloneOfferSections();
  rebindModalButtons(); // Ensure event listeners are attached to newly cloned buttons

  // Initialize countdown timers
  startCountdown(1200, "timer1"); // 20 minutes
  startCountdown(1200, "timer2");
  startCountdown(1200, "timer3");

  console.log("Hidden content revealed.");
}

/**
 * Clones the first offer section's content into the subsequent offer sections.
 */
function cloneOfferSections() {
  const offersSourceContainer = document.querySelector(
    ".offers-section .container"
  );
  if (!offersSourceContainer) {
    console.error("Source offer container not found for cloning.");
    return;
  }

  const offersSource = offersSourceContainer.cloneNode(true);

  const offersTarget2 = document.querySelector("#offers2");
  const offersTarget3 = document.querySelector("#offers3");

  if (offersTarget2) {
    offersTarget2.innerHTML = ""; // Clear existing content if any
    offersTarget2.appendChild(offersSource.cloneNode(true));
  } else {
    console.error("Target offer section #offers2 not found.");
  }

  if (offersTarget3) {
    offersTarget3.innerHTML = ""; // Clear existing content if any
    offersTarget3.appendChild(offersSource.cloneNode(true));
  } else {
    console.error("Target offer section #offers3 not found.");
  }
  console.log("Offer sections cloned.");
}

// -----------------------------------------------------------------------------
// Countdown Timer Logic
// -----------------------------------------------------------------------------

/**
 * Starts a countdown timer and updates the specified DOM element.
 * @param {number} duration - The duration of the countdown in seconds.
 * @param {string} elementId - The ID of the HTML element to display the timer.
 */
function startCountdown(duration, elementId) {
  let timer = duration;
  let minutes, seconds;
  const displayElement = document.getElementById(elementId);

  if (!displayElement) {
    console.error(
      `Countdown display element with ID "${elementId}" not found.`
    );
    return;
  }

  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayElement.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0; // Prevent timer from going negative
      // Optionally, add logic here for when the timer reaches zero
    }
  }, 1000);
}

// -----------------------------------------------------------------------------
// Purchase Modal and Form Handling
// -----------------------------------------------------------------------------

const purchaseModalElement = document.getElementById("purchaseModal");
const purchaseFormElement = document.getElementById("purchaseForm");
const planInputElement = document.getElementById("planInput");

/**
 * Rebinds click event listeners to all "Buy Now" buttons,
 * ensuring that they correctly set the plan in the purchase modal.
 * This is necessary after cloning offer sections.
 */
function rebindModalButtons() {
  document
    .querySelectorAll('.btn-buy[data-bs-toggle="modal"]')
    .forEach((button) => {
      // Remove existing listener to prevent multiple bindings if called repeatedly
      button.removeEventListener("click", handleBuyButtonClick);
      button.addEventListener("click", handleBuyButtonClick);
    });
}

/**
 * Handles the click event for "Buy Now" buttons.
 * Sets the selected plan in the hidden input field of the purchase modal.
 * @param {Event} event - The click event object.
 */
function handleBuyButtonClick(event) {
  const plan = event.currentTarget.getAttribute("data-plan");
  if (planInputElement) {
    planInputElement.value = plan;
  } else {
    console.error("Plan input field not found in the modal.");
  }
}

/**
 * Handles the submission of the purchase form.
 * Saves customer data to localStorage and redirects to the thank you page.
 * @param {Event} event - The form submission event.
 */
function handlePurchaseFormSubmit(event) {
  event.preventDefault();

  const customerName = document.getElementById("customerName")?.value;
  const customerEmail = document.getElementById("customerEmail")?.value;
  const customerPhone = document.getElementById("customerPhone")?.value;

  if (!customerName || !customerEmail || !customerPhone) {
    console.error("One or more customer data fields are missing.");
    // Optionally, display a user-friendly error message here
    return;
  }

  const customerData = {
    name: customerName,
    email: customerEmail,
    phone: customerPhone,
  };
  localStorage.setItem("customerData", JSON.stringify(customerData));

  const plan = planInputElement ? planInputElement.value : "unknown-plan";
  window.location.href = `obrigado.html?plan=${plan}`;
}

// -----------------------------------------------------------------------------
// Initializations
// -----------------------------------------------------------------------------

// Initial binding of modal buttons on page load.
// Note: `onYouTubeIframeAPIReady` is globally scoped and called by the YouTube API.
// Other initializations that depend on the DOM being fully loaded can go here.
document.addEventListener("DOMContentLoaded", () => {
  rebindModalButtons();

  if (purchaseFormElement) {
    purchaseFormElement.addEventListener("submit", handlePurchaseFormSubmit);
  } else {
    console.error("Purchase form element not found.");
  }
});
