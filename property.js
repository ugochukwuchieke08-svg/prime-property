const SUPABASE_URL =
  "https://wijocfywdtcakpxwsdte.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpam9jZnl3ZHRjYWtweHdzZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3MjAsImV4cCI6MjA5NDMyODcyMH0.o1uCtbrZJsLKt0j1Il-tWIBTY2hjYjevorMJhehofvk";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

const params =
  new URLSearchParams(window.location.search);

const propertyId =
  params.get("id");

const container =
  document.getElementById(
    "propertyDetails"
  );

async function fetchProperty() {

  const { data, error } =
    await supabaseClient
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();

  if (error) {

    container.innerHTML =
      "<p>Property not found</p>";

    console.log(error);

    return;
  }

  displayProperty(data);
}

function displayProperty(p) {

  const mainImage = p.images?.[0] || "";

  const hasExtraImages =
    p.images && p.images.length > 1;

  const sideImages = hasExtraImages
    ? p.images.slice(1).map(img => `
        <img src="${img}" class="gallery-image">
      `).join("")
    : "";

  container.innerHTML = `

    <div class="property-page">

      <div class="gallery">

        <img
          src="${mainImage}"
          class="gallery-main"
        >

        ${
          hasExtraImages
          ? `
            <div class="gallery-side">
              ${sideImages}
            </div>
          `
          : ""
        }

      </div>

      <div class="property-info">

        <div class="left-section">

          <div class="card">

            <h1 class="property-title">
              ${p.title}
            </h1>

            <p class="location">
              ${p.location}
            </p>

            <p class="price">
              ${p.price}
            </p>

            <p class="description">
              ${p.description}
            </p>

          </div>

          <div class="card">

            <h3>Features</h3>

            <div class="features">

              ${p.features.map(feature => `
                <div class="feature">
                  <div class="feature-label">
                    ${feature}
                  </div>
                </div>
              `).join("")}

            </div>

          </div>

        </div>

        <div class="right-section">

          <div class="card contact-card">

            <h3>Interested?</h3>

            <p>
              Schedule an inspection or contact
              the agent for more details.
            </p>

            <a
              href="#"
              class="contact-btn"
            >
              Contact Agent
            </a>

          </div>

        </div>

      </div>

    </div>

  `;
}

fetchProperty();

