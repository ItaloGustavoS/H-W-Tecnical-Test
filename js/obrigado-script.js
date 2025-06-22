document.addEventListener("DOMContentLoaded", function () {
  // Configuration for product plans, their details, and bonuses
  const plansConfig = {
    "6-potes": {
      price: "$294",
      quantity: "6 potes",
      productImage: "Assets do Produto/img-6-bottles.webp", // Placeholder, update with actual path if available
      bonusName: "Guia Completo de Jejum Intermitente",
      bonusImage: "Assets do Produto/bonus1.webp", // Placeholder, update with actual path
    },
    "3-potes": {
      price: "$207",
      quantity: "3 potes",
      productImage: "Assets do Produto/img-3-bottles.webp", // Placeholder, update with actual path
      bonusName: "Receitas Keto Deliciosas",
      bonusImage: "Assets do Produto/bonus2.webp", // Placeholder, update with actual path
    },
    "2-potes": {
      price: "$158",
      quantity: "2 potes",
      productImage: "Assets do Produto/img-2-bottles.webp", // Placeholder, update with actual path
      bonusName: "Desafio de 30 Dias para Perda de Peso",
      bonusImage: "Assets do Produto/bonus3.webp", // Placeholder, update with actual path
    },
    // Default plan if the planKey is not found or is invalid
    default: {
        price: "N/A",
        quantity: "Unspecified Plan",
        productImage: "Assets do Produto/Bottle-Mockup.png", // Generic placeholder
        bonusName: "Standard Bonus",
        bonusImage: "Assets do Produto/favicon.ico", // Generic placeholder
    }
  };

  // DOM Element selectors
  const thankYouTitleElement = document.getElementById("thankYouTitle");
  const customerEmailElement = document.getElementById("customerEmail");
  const productImageElement = document.getElementById("productImage");
  const productDetailsElement = document.getElementById("productDetails");
  const bonusImageElement = document.getElementById("bonusImage");
  const bonusTextElement = document.getElementById("bonusText");

  /**
   * Retrieves customer data from localStorage.
   * @returns {object|null} The customer data object or null if not found.
   */
  function getCustomerData() {
    const data = localStorage.getItem("customerData");
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing customer data from localStorage:", error);
      return null;
    }
  }

  /**
   * Retrieves the selected plan key from URL parameters.
   * @returns {string} The plan key.
   */
  function getPlanKeyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("plan");
  }

  /**
   * Updates the page content based on customer data and selected plan.
   * @param {object} customerData - The customer's data.
   * @param {object} planDetails - The details of the selected plan.
   */
  function updatePageContent(customerData, planDetails) {
    // Update customer-specific information
    if (customerData && customerData.name && thankYouTitleElement) {
      thankYouTitleElement.textContent = `Thank You ${customerData.name} & Congratulations!`;
    } else if (thankYouTitleElement) {
      // Fallback if name is not in customerData, but the static HTML already has a good default.
      // This JS part primarily handles adding the name.
      // thankYouTitleElement.textContent = `Thank You & Congratulations!`;
    }

    if (customerData && customerData.email && customerEmailElement) {
      customerEmailElement.textContent = customerData.email;
    } else if (customerEmailElement) {
      customerEmailElement.textContent = "[Email not provided]";
    }

    // Update plan-specific information
    // The quantity string might include "potes", ensure it's "bottles"
    const quantityText = planDetails.quantity.toLowerCase().includes("potes")
                         ? planDetails.quantity.replace(/potes/i, "bottles")
                         : planDetails.quantity;
    const productImageAltText = `Image of ${quantityText}`;
    const bonusImageAltText = `Image of ebook ${planDetails.bonusName}`;
    const bonusDisplayText = `With your purchase of <strong>${quantityText}</strong>, you will receive the ebook <strong>${planDetails.bonusName}</strong>, ENJOY!`;


    if (productImageElement) {
      productImageElement.src = planDetails.productImage;
      productImageElement.alt = productImageAltText;
    }
    if (productDetailsElement) {
      productDetailsElement.textContent = `${planDetails.price} | ${quantityText}`;
    }
    if (bonusImageElement) {
      bonusImageElement.src = planDetails.bonusImage;
      bonusImageElement.alt = bonusImageAltText;
    }
    if (bonusTextElement) {
      bonusTextElement.innerHTML = bonusDisplayText;
    }
  }

  // Main logic execution
  const customerData = getCustomerData();
  const planKey = getPlanKeyFromURL();
  const selectedPlan = plansConfig[planKey] || plansConfig.default; // Fallback to default if planKey is invalid

  updatePageContent(customerData, selectedPlan);

  console.log("Thank you page initialized.");
  console.log("Selected Plan Key:", planKey);
  console.log("Selected Plan Details:", selectedPlan);
  console.log("Customer Data:", customerData);
});
