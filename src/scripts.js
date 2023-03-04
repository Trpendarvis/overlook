// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

  // I want a function to set a random image as the background from the image array above.
  document.addEventListener("DOMContentLoaded", function() {
  const images = ['eva-darron-oCdVtGFeDC0-unsplash.jpg', 'eva-darron-oCdVtGFeDC0-unsplash.jpg', 'dino-reichmuth-A5rCN8626Ck-unsplash.jpg'];
  let currentIndex = -1;

  function changeImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    // console.log("images???", `url(images/${images[currentIndex]})`);
    const imgUrl = `url(images/${images[currentIndex]})`;
    document.getElementById("background-image").style.backgroundImage = imgUrl;
  }
  changeImage();
  setInterval(changeImage, 3000);
  })



// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
