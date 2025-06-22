# Product Sales Landing Page

This project consists of a product sales landing page (`vsl.html`) and a corresponding thank-you page (`obrigado.html`). It aims to present a product to potential customers, encourage a purchase through timed offers, and confirm the purchase with relevant order details.

## Features

### `vsl.html` (Sales Page)
- **Embedded Video Presentation:** Utilizes the YouTube Player API to embed and control a sales video.
- **Dynamic Content Reveal:** Main sales content (offers, FAQ, etc.) is hidden until a specific point in the video is reached.
- **Multiple Product Offers:** Displays various purchasing options (e.g., different quantities of the product) with distinct pricing and discounts.
- **"Most Popular" Highlight:** One offer can be visually highlighted as the most popular choice.
- **Countdown Timers:** Multiple countdown timers are used to create urgency for the offers.
- **Guarantee Section:** Information about the product's satisfaction guarantee.
- **FAQ Section:** An accordion-style Frequently Asked Questions section.
- **Scientific References:** Lists scientific studies related to the product.
- **Purchase Modal:** A pop-up form to collect customer details (name, email, phone) before proceeding to checkout.
- **Data Persistence:** Customer data is stored in `localStorage` and the selected plan is passed to the thank-you page via URL parameters.

### `obrigado.html` (Thank You Page)
- **Personalized Greeting:** Displays a thank you message including the customer's name (retrieved from `localStorage`).
- **Order Summary:** Dynamically shows details of the purchased plan, including:
    - Product image (varies by plan).
    - Price and quantity.
- **Bonus Information:** Details about a free bonus product, which varies based on the purchased plan.
- **Shipping Information:** Provides estimated delivery times and displays the customer's email (retrieved from `localStorage`).
- **Contact Information:** Offers support email for order inquiries.

## Technologies Used

-   **HTML5:** For structuring the web pages.
-   **CSS3:** For styling, including:
    -   Custom styles for layout, typography, and component appearance.
    -   Google Fonts for custom typography.
-   **Bootstrap 5:** A CSS framework used for responsive design and pre-styled components (grids, cards, modals, accordion, etc.).
-   **JavaScript (ES6+):** For client-side interactivity and dynamic content, including:
    -   **YouTube Player API:** To embed and control the sales video.
    -   **DOM Manipulation:** To show/hide content, update text, and modify elements dynamically.
    -   **Event Handling:** For user interactions like button clicks and form submissions.
    -   **`localStorage`:** To store customer data temporarily between page loads.
    -   **URL Parameters:** To pass information (selected plan) between `vsl.html` and `obrigado.html`.

## Project Structure (Post-Refactoring)

```
.
├── Assets do Produto/      # Images and other static assets
├── css/
│   ├── vsl-style.css       # Styles for vsl.html
│   └── obrigado-style.css  # Styles for obrigado.html
├── js/
│   ├── vsl-script.js       # JavaScript for vsl.html
│   └── obrigado-script.js  # JavaScript for obrigado.html
├── vsl.html                # Main sales page
├── obrigado.html           # Thank you page
└── README.md               # This file
```

## Setup and Usage

1.  Clone the repository.
2.  Open `vsl.html` in a web browser to view the sales page.
3.  Interaction with the purchase modal on `vsl.html` will redirect to `obrigado.html`.

No server-side setup is required as this is a purely front-end project. Ensure you have an active internet connection for Bootstrap CSS/JS and Google Fonts to load from CDNs, and for the YouTube video to play.
