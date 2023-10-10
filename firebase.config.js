import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAECpivGAjUHX8H1jZSTXsPbzPfGFNb4A",
  authDomain: "milky-way-89101.firebaseapp.com",
  projectId: "milky-way-89101",
  storageBucket: "milky-way-89101.appspot.com",
  messagingSenderId: "478203323690",
  appId: "1:478203323690:web:71ea79c59a13ed963c2a53",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
