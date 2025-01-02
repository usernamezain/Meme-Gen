setTimeout(() => {
  document.querySelector(".loader-page").style.transform = "scale(0)";
}, 3500);
document.addEventListener("DOMContentLoaded", function () {
  var urlMemeForm = document.getElementById("url-meme-form");
  var urlOutput = document.getElementById("url-output");
  var downloadBtn = document.getElementById("download-btn"); // Get the existing button

  // URL Meme Generator
  urlMemeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var imageUrl = document.getElementById("uploaded-img").value;
    var topText = document.getElementById("text-top").value;
    var bottomText = document.getElementById("text-bottom").value;
    var resolution = document.getElementById("resolution-url").value;

    if (imageUrl) {
      generateMemeFromUrl(imageUrl, topText, bottomText, resolution);
    }
  });

  // Function to generate meme from URL
  function generateMemeFromUrl(imageUrl, topText, bottomText, resolution) {
    var img = new Image();
    img.src = imageUrl;

    img.onload = function () {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      var width = img.width * (resolution / 100);
      var height = img.height * (resolution / 100);

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      if (topText) {
        ctx.font = "40px Impact";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.fillText(topText, canvas.width / 2, 50);
        ctx.strokeText(topText, canvas.width / 2, 50);
      }

      if (bottomText) {
        ctx.font = "40px Impact";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 50);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 50);
      }

      // Create the meme image and show it in the output
      var memeImage = new Image();
      memeImage.src = canvas.toDataURL();

      urlOutput.innerHTML = ""; // Clear the previous content
      urlOutput.appendChild(memeImage); // Add the new meme image

      // Make the download button visible
      downloadBtn.style.display = "inline-block";

      // Add event listener for download button
      downloadBtn.onclick = function () {
        // Convert canvas to a downloadable link
        var link = document.createElement("a");
        link.href = canvas.toDataURL(); // Use the image from canvas
        link.download = "meme.png"; // Set the file name for download
        link.click(); // Trigger the download
      };
    };
  }
});
