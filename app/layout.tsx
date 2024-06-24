import './globals.css'
import { Rubik } from 'next/font/google'

const roboto = Rubik({ subsets: ['arabic'] })
export const metadata = {
  title: 'DSHinfrared',
  description: 'specialize in infrared thermography inspections.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
