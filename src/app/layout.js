import './global.css'

export const metadata = {
  title: 'QuickRent - Your Trusted Rental Partner',
  description: 'Find anything you need to rent or list your items to grow your business. Connect with 5K+ items, 2K+ active renters, and 500+ rental shops.',
  keywords: 'rental, rent items, list rentals, equipment rental, peer-to-peer rental, rental marketplace',
  authors: [{ name: 'QuickRent Team' }],
  creator: 'QuickRent',
  publisher: 'QuickRent',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quickrent.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'QuickRent - Your Trusted Rental Partner',
    description: 'Find anything you need to rent or list your items to grow your business.',
    url: 'https://quickrent.com',
    siteName: 'QuickRent',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'QuickRent - Rental Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickRent - Your Trusted Rental Partner',
    description: 'Find anything you need to rent or list your items to grow your business.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        <div id="skip-link">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-400 text-black px-4 py-2 rounded z-50"
          >
            Skip to main content
          </a>
        </div>
        {children}
      </body>
    </html>
  )
}