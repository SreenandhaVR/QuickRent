'use client';
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Hero = dynamic(() => import('../components/Hero'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}