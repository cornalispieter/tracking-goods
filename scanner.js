function startScan(boxId, readerId, callback) {
  document.getElementById(boxId).classList.remove("hidden");

  const scanner = new Html5Qrcode(readerId);

  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 200 },
    (text) => {
      callback(text);
      scanner.stop();
      document.getElementById(boxId).classList.add("hidden");
    }
  );
}

function startCodeScan() {
  startScan("scanner-code-box", "qr-reader-code", text => {
    document.getElementById("code-input").value = text;
  });
}

function startLocationScan() {
  startScan("scanner-location-box", "qr-reader-location", text => {
    document.getElementById("location-input").value = text;
  });
}
