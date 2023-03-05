// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

  // I want a function to set a random image as the background from the image array above.
document.addEventListener("DOMContentLoaded", function() {
const images = ['eva-darron-oCdVtGFeDC0-unsplash.jpg', 'eva-darron-oCdVtGFeDC0-unsplash.jpg', 'dino-reichmuth-A5rCN8626Ck-unsplash.jpg', 'ross-parmly-rf6ywHVkrlY-unsplash.png', 'robert-lukeman-zNN6ubHmruI-unsplash.jpg', 'pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg', 'jack-anstey-XVoyX7l9ocY-unsplash.jpg'];
let currentIndex = 0;
function changeImage() {
    currentIndex++;
    if(currentIndex >= images.length) {
    currentIndex = 0;
    }
const imgUrl = `url(images/${images[currentIndex]})`;
document.getElementById("background-image").style.backgroundImage = imgUrl;
}
  changeImage();
  setInterval(changeImage, 10000);
})

document.addEventListener('DOMContentLoaded', function() {
    const datepicker = document.getElementById('datepicker');
    const datepickerConfig = {dateFormat: 'mm/dd/yy'};
    new DatePicker(datepicker, datepickerConfig);
  });
  
  

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
