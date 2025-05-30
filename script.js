
const toggleSwitch = document.getElementById("toggleSwitch");
const welcomeSection = document.getElementById("welcomeSection");
const productViewContent = document.getElementById("productViewContent");
const contentArea = document.getElementById("contentArea");
const locationDropdown = document.getElementById("locationDropdown");
const citySearchContainer = document.getElementById("citySearchContainer");
const citySearchInput = document.getElementById("citySearchInput");
const cityList = document.getElementById("cityList");
const blurOverlay = document.getElementById("blurOverlay");
const mainSearchInput = document.getElementById("mainSearchInput");
const productInput = document.getElementById("productInput");
const hiNavItem = document.getElementById("hiNavItem");
const hiDropdown = document.getElementById("hiDropdown");
const helpNavItem = document.getElementById("helpNavItem");
const helpDropdown = document.getElementById("helpDropdown");
let isChatView = true;

toggleSwitch.addEventListener("click", function () {
  isChatView = !isChatView;
  if (isChatView) {
    toggleSwitch.classList.add("chat-view");
    toggleSwitch.classList.remove("product-view");
    welcomeSection.style.display = "block";
    productViewContent.style.display = "none";
    contentArea.classList.remove("product-view");
  } else {
    toggleSwitch.classList.remove("chat-view");
    toggleSwitch.classList.add("product-view");
    welcomeSection.style.display = "none";
    productViewContent.style.display = "block";
    contentArea.classList.add("product-view");
  }
});

hiNavItem.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  hiDropdown.classList.toggle("show");
  helpDropdown.classList.remove("show");
});

helpNavItem.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  helpDropdown.classList.toggle("show");
  hiDropdown.classList.remove("show");
});



function hideCitySearch() {
  citySearchContainer.style.display = "none";
  hideBlurOverlay();
}

document.addEventListener("click", function (e) {
  if (!hiNavItem.contains(e.target)) {
    hiDropdown.classList.remove("show");
  }

  if (!helpNavItem.contains(e.target)) {
    helpDropdown.classList.remove("show");
  }

  if (
    !citySearchContainer.contains(e.target) &&
    !locationDropdown.contains(e.target)
  ) {
    hideCitySearch();
  }
});

locationDropdown.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  showCitySearch();
});

function showBlurOverlay() {
  blurOverlay.style.display = "block";
}

function hideBlurOverlay() {
  blurOverlay.style.display = "none";
}

mainSearchInput.addEventListener("focus", showBlurOverlay);
productInput.addEventListener("focus", showBlurOverlay);

mainSearchInput.addEventListener("blur", function () {
  setTimeout(hideBlurOverlay, 100);
});

productInput.addEventListener("blur", function () {
  setTimeout(hideBlurOverlay, 100);
});

blurOverlay.addEventListener("click", function () {
  hideCitySearch();
  hideBlurOverlay();
  hiDropdown.classList.remove("show");
  helpDropdown.classList.remove("show");
  mainSearchInput.blur();
  productInput.blur();
});

function submitRequirement() {
  const productName = productInput.value.trim();

  if (productName === "") {
    alert("Please enter a product or service name");
    return;
  }

  alert(`Requirement submitted for: ${productName}`);
  productInput.value = "";
}

document.querySelector(".search-btn").addEventListener("click", function () {
  const searchTerm = mainSearchInput.value.trim();

  if (searchTerm) {
    alert(`Searching for: ${searchTerm}`);
  } else {
    alert("Please enter a search term");
  }
});

document.querySelector(".voice-btn").addEventListener("click", function () {
  alert("Voice search activated! (This is a demo)");
});

document.querySelector(".get-price-btn").addEventListener("click", function () {
  alert("Get Best Price feature clicked!");
});

document.querySelectorAll(".nav-item").forEach((item) => {
  if (item.id !== "hiNavItem" && item.id !== "helpNavItem") {
    item.addEventListener("click", function () {
      const text = this.textContent.trim();
      alert(`${text} clicked!`);
    });
  }
});

document.querySelectorAll("#hiDropdown .dropdown-menu a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const text = this.querySelector("span").textContent.trim();
    alert(`${text} clicked!`);
    hiDropdown.classList.remove("show");
  });
});

document.querySelector(".profile-link").addEventListener("click", function (e) {
  e.preventDefault();
  alert("View Profile clicked!");
  hiDropdown.classList.remove("show");
});

document.querySelectorAll("#helpDropdown .dropdown-menu a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    helpDropdown.classList.remove("show");
  });
});

productInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitRequirement();
  }
});

mainSearchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.querySelector(".search-btn").click();
  }
});

locationDropdown.addEventListener("click", function () {
  citySearchContainer.style.display =
    citySearchContainer.style.display === "block" ? "none" : "block";
  blurOverlay.style.display = citySearchContainer.style.display;
});


const cityItems = document.querySelectorAll(".city-item");
cityItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedCity = this.getAttribute("data-city");
    locationDropdown.innerHTML = `<option>${selectedCity}</option>`;
    citySearchContainer.style.display = "none";
    blurOverlay.style.display = "none";
  });
});

citySearchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  cityItems.forEach((item) => {
    const cityName = item.textContent.toLowerCase();
    if (cityName.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hiDropdown.classList.remove("show");
    helpDropdown.classList.remove("show");
    hideCitySearch();
    hideBlurOverlay();
  }
});
