function updateSliderValue(slider) {
  const valueSpan = slider.parentElement.querySelector('.slider-value');
  let value = slider.value;
  if (slider.id === 'loanAmount') value = (value / 100000) + 'L';
  if (slider.id === 'tenure') value = value + 'M';
  if (slider.id === 'interest') value = value + '%';
  valueSpan.textContent = value;

  // Move the value bubble above the thumb
  const percent = (slider.value - slider.min) / (slider.max - slider.min);
  valueSpan.style.left = `calc(${percent * 100}% - 16px)`;
}

// Initialize value bubbles on page load
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.custom-slider input[type=range]').forEach(updateSliderValue);
});

let sliderIndex = 1;
const sliderImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
];

function renderSlider() {
  const track = document.querySelector('.slider-track');
  if (!track) return;
  track.innerHTML = '';
  // Show previous, current, next (circular)
  const prev = (sliderIndex - 1 + sliderImages.length) % sliderImages.length;
  const curr = sliderIndex;
  const next = (sliderIndex + 1) % sliderImages.length;
  [prev, curr, next].forEach((idx, i) => {
    const img = document.createElement('img');
    img.src = sliderImages[idx];
    img.className = 'slider-img' + (i === 1 ? ' active' : '');
    track.appendChild(img);
  });
}

function moveSlider(dir) {
  sliderIndex = (sliderIndex + dir + sliderImages.length) % sliderImages.length;
  renderSlider();
}

window.addEventListener('DOMContentLoaded', function() {
  renderSlider();
});

// Card Carousel Auto Slide
(function() {
  const track = document.querySelector('.card-carousel-track');
  if (!track) return;
  const cards = Array.from(track.children);
  const totalCards = 16; // original cards
  const visibleCards = 12; // number of visible cards
  let index = 0;
  const cardWidth = cards[0].offsetWidth + 16; // gap included
  function slide() {
    index++;
    track.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    if (index === totalCards) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        index = 0;
      }, 700);
    }
  }
  setInterval(slide, 2000);
  // Expose for manual navigation
  window._carousel = { track, cards, cardWidth, totalCards, visibleCards, indexRef: () => index, setIndex: (i) => { index = i; } };
})();

function moveCarousel(dir) {
  const { track, cards, cardWidth, totalCards, visibleCards, indexRef, setIndex } = window._carousel;
  let index = indexRef();
  index += dir;
  if (index < 0) {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${(totalCards) * cardWidth}px)`;
    index = totalCards - 1;
    setTimeout(() => {
      track.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }, 20);
  } else if (index >= totalCards) {
    track.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    setTimeout(() => {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      setIndex(0);
    }, 700);
    return;
  } else {
    track.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
  setIndex(index);
}

// EMI Calculator Modal Logic
const emiModal = document.getElementById('emi-modal');
const emiModalClose = document.getElementById('emi-modal-close');

// Attach click event to EMI Calculator menu item
const emiMenuItem = document.querySelector('.navbar-item.dropdown .dropdown-menu .dropdown-submenu > a[href="#"]');
if (emiMenuItem && emiModal) {
  emiMenuItem.addEventListener('click', function(e) {
    if (emiMenuItem.textContent.trim() === 'EMI Calculator') {
      e.preventDefault();
      emiModal.style.display = 'block';
    }
  });
}

// Close modal on close button
if (emiModalClose) {
  emiModalClose.onclick = function() {
    emiModal.style.display = 'none';
  };
}
// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target === emiModal) {
    emiModal.style.display = 'none';
  }
}; 
function toggleFAQ(btn) {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const toggle = btn.querySelector('.faq-toggle');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.display = 'none';
      i.querySelector('.faq-toggle').textContent = '+';
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.display = 'block';
      toggle.textContent = '–';
    }
  }