import { Inter } from 'next/font/google'
import './global.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QuickRent - Rent Anything, Anytime',
  description: 'The easiest way to rent anything you need. From cameras to power tools, find everything without the commitment of buying.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}