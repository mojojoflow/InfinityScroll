const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const query = "graffiti";
const apiKey = "ugEbsjpwNnXAv2kOXZL_avFMagB7b6JwkY5jMABUo8w";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

// Check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
    }
}


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements for Links & Photos, Add to Dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
	photosArray.forEach((photo) => {
		// create <a> to link to Unsplash
		const item = document.createElement("a");

		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// Create <img> for photo
		const img = document.createElement("img");

		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
		// Put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

//  Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch Error Here
	}
}

// Check for scrolling new bottom of page, Load more photos
window.addEventListener('scroll', ()=> {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log('load more');
   };
});

// On Load
getPhotos();
