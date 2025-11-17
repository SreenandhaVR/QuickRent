'use client';
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../contexts/loading.css'

const Hero = dynamic(() => import('../components/Hero'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="warp-loader">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="core-glow"></div>
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