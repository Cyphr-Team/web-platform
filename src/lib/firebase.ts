import { APP_CONFIGS } from "@/configs"
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: APP_CONFIGS.FIREBASE_API_KEY,
  authDomain: APP_CONFIGS.FIREBASE_AUTH_DOMAIN,
  projectId: APP_CONFIGS.FIREBASE_PROJECT_ID,
  storageBucket: APP_CONFIGS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: APP_CONFIGS.FIREBASE_MESSAGING_SENDER_ID,
  appId: APP_CONFIGS.FIREBASE_APP_ID,
  measurementId: APP_CONFIGS.FIREBASE_MEASUREMENT_ID
}

export const firebaseApp = initializeApp(firebaseConfig)

export const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({ prompt: "select_account" })

export const auth = getAuth(firebaseApp)
