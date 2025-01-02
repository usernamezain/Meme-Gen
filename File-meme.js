// Created by Mughal.Dev Share With Credit < condition no copyright
setTimeout(() => {
  document.querySelector(".loader-page").style.transform = "scale(0)";
}, 3500);
document.addEventListener("DOMContentLoaded", function () {
  var fileMemeForm = document.getElementById("file-meme-form");
  var fileOutput = document.getElementById("file-output");
  var downloadBtn = document.getElementById("download-btn"); // Get the existing button

  // File Meme Generator
  fileMemeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var fileInput = document.getElementById("image-upload");
    var file = fileInput.files[0];
    var topText = document.getElementById("text-top-file").value;
    var bottomText = document.getElementById("text-bottom-file").value;
    var resolution = document.getElementById("resolution-file").value;

    if (file) {
      var imageUrl = URL.createObjectURL(file);
      generateMemeFromFile(imageUrl, topText, bottomText, resolution);
    }
  });

  // Function to generate meme from File
  function generateMemeFromFile(imageUrl, topText, bottomText, resolution) {
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

      var memeImage = new Image();
      memeImage.src = canvas.toDataURL();

      fileOutput.innerHTML = "";
      fileOutput.appendChild(memeImage);

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
