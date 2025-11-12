import { Inter } from 'next/font/google'
import './global.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QuickRent - The Future of Rental Solutions',
  description: 'Professional rental platform connecting communities through smart technology. Rent anything, anytime, anywhere.',
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