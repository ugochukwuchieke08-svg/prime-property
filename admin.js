  /*supabase*/
const SUPABASE_URL =
  "https://wijocfywdtcakpxwsdte.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpam9jZnl3ZHRjYWtweHdzZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3MjAsImV4cCI6MjA5NDMyODcyMH0.o1uCtbrZJsLKt0j1Il-tWIBTY2hjYjevorMJhehofvk";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  /*cloudinary*/
const CLOUD_NAME = "du6e7pzwg";

const UPLOAD_PRESET = "client upload";

const form =
  document.getElementById("propertyForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const status =
    document.getElementById("status");

  status.innerText = "Uploading...";

  const title =
    document.getElementById("title").value;

  const location =
    document.getElementById("location").value;

  const price =
    document.getElementById("price").value;

  const description =
    document.getElementById("description").value;

  const features =
    document.getElementById("features")
    .value
    .split(",")
    .map(f => f.trim())
    .filter(f => f !== "")

  const imageFiles =
    document.getElementById("images").files;

  let imageUrls = [];

  // upload images to cloudinary

  for (let file of imageFiles) {

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      UPLOAD_PRESET
    );

    const res = await fetch(

      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

      {
        method: "POST",
        body: data
      }

    );

    const uploaded =
      await res.json();

    imageUrls.push(
      uploaded.secure_url
    );
  }

  // save to supabase

  const { error } =
    await supabaseClient
      .from("properties")
      .insert([{

        title,
        location,
        price,
        description,
        images: imageUrls,
        features

      }]);

  if (error) {

    status.innerText =
      "Upload failed";

    console.log(error);

  } else {

    status.innerText =
      "Property uploaded successfully";

    form.reset();
  }

});