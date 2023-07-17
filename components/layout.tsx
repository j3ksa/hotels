import Meta from './meta'

type Props = {
  children: React.ReactNode
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
