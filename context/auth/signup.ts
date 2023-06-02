import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default async function signUp(auth: Auth, email: string, password: string) {
  let result = null, error = null, message = '';
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      if(res.user.email != null || res.user.email != '') {
        sendEmailVerification(auth?.currentUser!);
        message = 'Succesfully signed up with ' + email + '!\nPlease check your email to validate your account.';
      }
    });
  } catch (e) {
    error = e;
  }

  return {result , error, message}; 
}
