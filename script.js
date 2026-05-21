const SUPABASE_URL =
  "https://wijocfywdtcakpxwsdte.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpam9jZnl3ZHRjYWtweHdzZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3MjAsImV4cCI6MjA5NDMyODcyMH0.o1uCtbrZJsLKt0j1Il-tWIBTY2hjYjevorMJhehofvk";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
const grid = document.getElementById("propertyGrid");

function displayProperties(data) {

  grid.innerHTML = "";

  data.forEach(p => {

    grid.innerHTML += `

      <a href="property.html?id=${p.id}" class="property-link">

        <div class="card">

          <img src="${p.images?.[0] || 'images/fallback.jpg'}" />

          <div class="card-content">

            <h3>${p.title}</h3>

            <p>${p.location}</p>

            <p class="price">${p.price}</p>

          </div>

        </div>

      </a>

    `;
  });
}

fetchProperties();
async function fetchProperties() {

  const { data, error } =
    await supabaseClient
      .from("properties")
      .select("*")
      .order("created_at", {
        ascending: false
      });

  if (error) {

    console.log(error);
    return;
  }

  displayProperties(data);
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
/* header scroll effect */
const header = document.querySelector("header");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

const layers = document.querySelectorAll(".cta-bg");

const images = [
  "images/cta.png",
  "images/cta2.png"
];

let currentIndex = 0;
let currentLayer = 0;

// set initial image
layers[currentLayer].style.backgroundImage = `url(${images[currentIndex]})`;
layers[currentLayer].classList.add("active");

setInterval(() => {
  // next image
  currentIndex = (currentIndex + 1) % images.length;

  // switch layers
  const nextLayer = (currentLayer + 1) % 2;

  layers[nextLayer].style.backgroundImage = `url(${images[currentIndex]})`;
  layers[nextLayer].classList.add("active");

  layers[currentLayer].classList.remove("active");

  currentLayer = nextLayer;

}, 2000); // 6 seconds = premium pacing
                          