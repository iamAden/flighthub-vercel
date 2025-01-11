import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlightHub',
  description: 'Book your flights with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Toaster />
          {children}
        </main>
        
      </body>
    </html>
  )
}

