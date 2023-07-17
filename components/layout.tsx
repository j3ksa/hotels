import Meta from './meta'
import { Metadata } from 'next'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  themeColor: '#E22566',
  title: 'Hotel list challenge',
  description: 'Job task for Guestline by Łukasz Jęksa.',
  icons: {
    icon: '/favicon/favicon-32x32.png',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen pb-4 sm:py-10 bg-gradient-to-br from-[#1b1c5e] via-[#1b1c5ee8] to-[#1b1c5ed3] text-white overflow-x-hidden">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
