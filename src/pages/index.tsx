import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useSession, signIn, signOut } from "next-auth/react";
import Dashboard from './dashboard';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import Login from './auth';
import scss from './Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <main className={scss.main}>
        {session && <Dashboard />}
        {!session && <Login />}
      </main>
    </>
  )
}

export default Home;