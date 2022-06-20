import * as faceapi from "face-api.js";

async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  Promise.all([
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL),
    await faceapi.loadFaceLandmarkModel(MODEL_URL),
    await faceapi.loadFaceRecognitionModel(MODEL_URL),
  ]);
}

async function loadFaceRecognition(blob) {
  const OPTION = new faceapi.SsdMobilenetv1Options();
  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return fullDesc;
}

export { loadModels, loadFaceRecognition };
