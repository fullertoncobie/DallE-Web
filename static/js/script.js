document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('dalle-form');
   const loader = document.getElementById('loader');
   const imagePrompt = document.getElementById('image-prompt');
   const imageContainer = document.getElementById('generated-image');
   const image = document.getElementById('image');
   const errorMessage = document.getElementById('error-message');
   const dalleSubmission = document.getElementById("dalle-submission");

   function reduceMarginToZero() {
       dalleSubmission.style.marginTop = "0";
   }

   form.addEventListener('submit', function (event) {
       event.preventDefault(); // Prevent the form from submitting

       reduceMarginToZero();
       // Show the loader
       loader.style.display = 'block';

       // Send an AJAX request to your Flask route for image generation
       fetch('/generate_image', {
           method: 'POST',
           body: JSON.stringify({ prompt: document.getElementById('prompt').value }),
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then(response => response.json())
       .then(data => {
           // Hide the loader
           loader.style.display = 'none';

           if (data.error) {
               // Display an error message
               errorMessage.textContent = data.error;
           } else {
               // Display the generated image
               imagePrompt.textContent = `Enhanced prompt:\n ${data.revised_prompt}`;
               imageContainer.style.display = 'block'; // Show the image container
               image.src = data.image_url; // Update the image source with the generated image URL
           }
       })
       .catch(error => {
           // Handle any fetch error here
           errorMessage.textContent = 'An error has occured';
           console.log(error);
       });
   });
});
