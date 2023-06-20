

    // Toggle Search Field
function toggleSearch() {
  var searchField = document.querySelector('.search-field');
  searchField.classList.toggle('active');
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  var navigation = document.querySelector('.navigation');
  navigation.classList.toggle('active');
}

// Event listeners for toggle functions
document.querySelector('.flat-button').addEventListener('click', toggleSearch);
document.querySelector('.icon-button.large').addEventListener('click', toggleSearch);
document.querySelector('.icon-button.large .ph-list').addEventListener('click', toggleMobileMenu);
