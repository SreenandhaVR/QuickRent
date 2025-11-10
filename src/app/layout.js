import './global.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'QuickRent - Rent Anything',
  description: 'Peer-to-peer rental platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}