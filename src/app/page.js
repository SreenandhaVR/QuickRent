import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

const Hero = dynamic(() => import('../components/Hero'), {
  loading: () => <div className="h-screen bg-black" />,
})

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
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