'use client'
import '../styles/globals.css';
import Head from './head';
import Notification from '../components/Notification';
import { AuthContextProvider } from '../context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head/>
      <body>
        <AuthContextProvider>
          <div className='flex flex-col overflow-hidden h-screen max-h-screen'>
            {children}
            <Notification/>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
};
