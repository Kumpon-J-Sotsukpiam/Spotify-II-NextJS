import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify II</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className='flex'>
        {/* sidebar */}
        <Sidebar />
        {/* center */}
        <Center />
      </main>
      <div className='sticky bottom-0'>
        {/* player */}
        <Player />
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}