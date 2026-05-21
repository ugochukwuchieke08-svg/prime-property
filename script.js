const SUPABASE_URL =
  "https://wijocfywdtcakpxwsdte.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpam9jZnl3ZHRjYWtweHdzZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3MjAsImV4cCI6MjA5NDMyODcyMH0.o1uCtbrZJsLKt0j1Il-tWIBTY2hjYjevorMJhehofvk";

const supabaseClient =
  window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const grid = document.getElementById("propertyGrid");
const searchInput = document.getElementById("searchInput");

let allProperties = [];

/* ---------------- DISPLAY ---------------- */
function displayProperties(data) {
  grid.innerHTML = "";

  if (!data || data.length === 0) {
    grid.innerHTML = `<p>No properties found.</p>`;
    return;
  }

  data.forEach(p => {
    grid.innerHTML += `
      <a href="property.html?id=${p.id}" class="property-link">
        <div class="card">
          <img src="${p.images?.[0] || 'images/fallback.jpg'}" />
          <div class="card-content">
            <h3>${p.title || ""}</h3>
            <p>${p.location || ""}</p>
            <p class="price">${p.price || ""}</p>
          </div>
        </div>
      </a>
    `;
  });
}

/* ---------------- FETCH ON LOAD ---------------- */
async function fetchProperties() {
  const { data, error } =
    await supabaseClient
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  allProperties = data;
  displayProperties(allProperties);
}

fetchProperties();

/* ---------------- SEARCH (FIXED) ---------------- */
function filterProperties(value) {
  const searchValue = (value || "").toLowerCase();

  const filtered = allProperties.filter(property =>
    (property.title && property.title.toLowerCase().includes(searchValue)) ||
    (property.location && property.location.toLowerCase().includes(searchValue))
  );

  displayProperties(filtered);
}

/* ---------------- LIVE SEARCH ---------------- */
searchInput.addEventListener("input", (e) => {
  filterProperties(e.target.value);
});

/* ---------------- MENU TOGGLE ---------------- */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

/* ---------------- HEADER SCROLL EFFECT ---------------- */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ---------------- CTA BACKGROUND SLIDER ---------------- */
const layers = document.querySelectorAll(".cta-bg");

const images = [
  "images/cta.png",
  "images/cta2.png"
];

let currentIndex = 0;
let currentLayer = 0;

if (layers.length > 0) {
  layers[currentLayer].style.backgroundImage = `url(${images[currentIndex]})`;
  layers[currentLayer].classList.add("active");

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    const nextLayer = (currentLayer + 1) % 2;

    layers[nextLayer].style.backgroundImage = `url(${images[currentIndex]})`;
    layers[nextLayer].classList.add("active");

    layers[currentLayer].classList.remove("active");

    currentLayer = nextLayer;
  }, 2000);
}
