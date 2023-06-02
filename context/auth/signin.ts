import { Auth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

export default async function signIn(auth: Auth, email: string, password: string) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser?.emailVerified == false) {
      error = 'Please check your email and activate your account!';
      sendEmailVerification(auth?.currentUser!);
    }
  } catch (e) {
    error = e;
  }

  return {result , error}; 
}
