import './global.css'

export const metadata = {
  title: 'QuickRent - Your Trusted Rental Partner',
  description: 'Find anything you need to rent or list your items to grow your business. Connect with 5K+ items, 2K+ active renters, and 500+ rental shops.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}