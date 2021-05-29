// alert('Working??');

const video = document.getElementById("video");
// video.style.display = "none";
const btnclick = document.getElementById("clickbtn");
const CapturedImage = document.getElementById("image");
const submitBtn = document.getElementById("submitBtn");
const startCam = document.getElementById("clickbtn2");
const overlay = document.getElementById("overlay");
const loader = document.getElementById("loader");
const locationVal = document.getElementById("location");

console.log(CapturedImage, submitBtn);

navigator.mediaDevices
  .getUserMedia({
    video: {
      width: {
        min: 480,
        max: 480,
      },
      height: {
        min: 480,
        max: 640,
      },
      facingMode: {
        exact: "environment",
      },
    },
  })
  .then((stream) => {
    startCam.addEventListener(
      "click",
      function (ev) {
        video.srcObject = stream;
        video.style.display = "inline-block";
        btnclick.style.display = "inline-block";
        startCam.style.display = "none";
        ev.preventDefault();
      },
      false
    );
    const mediaStreamTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    btnclick.addEventListener(
      "click",
      function (ev) {
        click(imageCapture);
        ev.preventDefault();
      },
      false
    );
  })
  .catch((err) => console.log("Cannot Get Video From the user:", err));

function click(imageCapture) {
  console.log("in the click function!!");
  const video = document.getElementById("video");
  imageCapture
    .takePhoto()
    .then((blob) => {
      const img = document.getElementById("clicked_image");
      video.style.display = "none";
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        img.src = base64data;
        img.style.display = "inline-block";
        CapturedImage.value = base64data;
        btnclick.style.display = "none";
        submitBtn.style.display = "inline-block";
        console.log(CapturedImage.value);
      };
    })
    .catch((err) => console.log(err));
}

submitBtn.addEventListener(
  "click",
  function (ev) {
    overlay.style.display = "block";
    loader.style.display = "block";
  },
  false
);

function getLocation() {
  if (navigator.geolocation) {
    console.log("Here in geoloacation");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("not working!");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  locationVal.value = position.coords.latitude+";"+position.coords.longitude;
  console.log(locationVal);
}
getLocation();
