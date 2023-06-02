import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default async function signOutFirebase() {
  let result = null, error = null;
  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return {result , error}; 
}
