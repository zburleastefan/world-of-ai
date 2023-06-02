import { User, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import SignIn from '../app/signin/page';
import SignUp from '../app/signup/page';
import { usePathname } from 'next/navigation';
import ForgotPassword from '../app/forgotpassword/page';
import { auth } from '../firebase/firebaseConfig';
import LoadingDots from '../components/LoadingDots';

export const AuthContext = React.createContext({});
export const useAuthContext = () =>  React.useContext(AuthContext);
export const AuthContextProvider = ({
    children,
}:{
    children: React.ReactNode
}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<Boolean>(true);
    const pathName = usePathname();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
    <AuthContext.Provider value={{auth}}>
        { loading ? 
            <div 
                className="relative bg-[#476ec2] bg-no-repeat bg-center bg-cover place-items-center bg-[url('/aiImg.svg')] object-scale-down 
                h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
            > 
                <h1 className="text-3xl font-display font-serif md:text-5xl font-bold tracking-normal text-[#11A37F] ">
                    Loading{" "}
                    <span className="relative text-3xl"><LoadingDots /></span>
                </h1>
            </div>
        : user && user.emailVerified == true ? 
            children
        : pathName?.includes('forgotpassword') ?
            <ForgotPassword />
        : pathName?.includes('signup') ?
            <SignUp/>
        :
            <SignIn/>
        }
    </AuthContext.Provider>
  );
}

export const authContext = auth;