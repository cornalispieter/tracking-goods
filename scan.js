// scan.js FINAL (CORS FIXED)
import { BrowserMultiFormatReader } from "https://cdn.jsdelivr.net/npm/@zxing/library@0.21.2/esm/index.js";
import { cleanScannedCode } from './utils.js';

let codeReader = new BrowserMultiFormatReader();

export function startScanner(targetInputId) {
  const inputField = document.getElementById(targetInputId);
  if (!inputField) return;

  const previewElem = document.createElement("video");
  previewElem.className =
    "fixed inset-0 bg-black/80 z-[9999] w-full h-full object-cover";

  document.body.appendChild(previewElem);

  codeReader.decodeOnceFromVideoDevice(undefined, previewElem)
    .then(result => {
      const raw = result.text;
      const cleaned = cleanScannedCode(raw);

      inputField.value = cleaned;

      previewElem.remove();
      codeReader.reset();
    })
    .catch(err => {
      console.error(err);
      previewElem.remove();
      codeReader.reset();
    });
}
