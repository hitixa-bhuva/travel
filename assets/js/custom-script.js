
let _savedScrollY = 0;
const megaMenu = document.getElementById('megaMenu');
const megaOverlay = document.getElementById('megaOverlay');
const destToggle = document.getElementById('destToggle');
const megaClose = document.getElementById('megaClose');
const body = document.body;
const menuImage = document.getElementById('menuImage');

const regionDefault = {
  africa: 'assets/img/nav/Africa.jpg',
  arctic: 'assets/img/nav/Arctic-Circle.jpg',
  asia: 'assets/img/nav/Asia-1.jpg',
  caribbean: 'assets/img/nav/Caribbean.jpg',
  europe: 'assets/img/nav/Europe.jpg',
  indianocean: 'assets/img/nav/IndianOcean.jpg',
  indiansubcontinent: 'assets/img/nav/IndianSubcontinent.jpg',
  latinameric: 'assets/img/nav/LatinAmerica.jpg',
  america: 'assets/img/nav/america.jpg',
  northamerica: 'assets/img/nav/North-America.jpg',
  middleeast: 'assets/img/nav/MiddleEast.jpg',
  southeastasia: 'assets/img/nav/South-East-Asia.jpg',
  southpacific: 'assets/img/nav/SouthPacific.jpg'
};

let currentRegion = 'africa';

function openMegaMenu() {
  _savedScrollY = window.scrollY || window.pageYOffset || 0;
  // Lock scroll
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_savedScrollY}px`;
  document.body.style.width = '100%';
  
  // Show menu and overlay
  megaMenu.classList.add('active');
  megaOverlay.classList.add('active');
  megaMenu.setAttribute('aria-hidden', 'false');
}

function closeMegaMenu() {
  // Hide menu and overlay
  megaMenu.classList.remove('active');
  megaOverlay.classList.remove('active');
  megaMenu.setAttribute('aria-hidden', 'true');

  // Restore scroll
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, _savedScrollY);
}


function toggleMegaMenu() {
  if (megaMenu.classList.contains('active')) closeMegaMenu();
  else openMegaMenu();
}

destToggle?.addEventListener('click', toggleMegaMenu);
megaClose?.addEventListener('click', closeMegaMenu);
megaOverlay?.addEventListener('click', closeMegaMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && megaMenu.classList.contains('active')) closeMegaMenu();
});

function showCountries(region) {
  document.querySelectorAll('.countries').forEach(el => el.style.display = 'none');
  const el = document.getElementById(region);
  if (el) el.style.display = 'block';
  currentRegion = region;
  showRegionImage(region);
}

function showRegionImage(region) {
  const filename = regionDefault[region] || '';
  if (!filename) return;
  menuImage.src = filename;
}

function showImage(imgPath) {
  menuImage.src = imgPath;
}

// Revert to region image on mouse leave
document.querySelectorAll('.countries li').forEach(country => {
  country.addEventListener('mouseleave', () => showRegionImage(currentRegion));
});

window.addEventListener('DOMContentLoaded', () => showCountries(currentRegion));
