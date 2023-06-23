import { User, onAuthStateChanged } from 'firebase/auth';
import SignIn from '../app/signin/page';
import SignUp from '../app/signup/page';
import { usePathname } from 'next/navigation';
import ForgotPassword from '../app/forgotpassword/page';
import { auth } from '../firebase/firebaseConfig';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingDots from '../components/LoadingDots';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}:{
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);
    const pathName = usePathname();

    useEffect(() => {
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
                className="relative bg-[#476ec2] bg-no-repeat bg-center bg-cover place-items-center bg-[url('/abstract-technology-ai-computing.svg')] object-scale-down 
                h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden"
            > 
                <LoadingDots />
            </div>
        : user && user.uid != null ? 
            
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