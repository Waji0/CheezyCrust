import { Outlet } from "react-router-dom"
import Header from "./Header"

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#240046] text-[#FF9E00]">
      <Header/>
      <main>
        <div className="py-4 bg-[#240046] text-[#FF9E00]">
            <section className="max-w-3xl mx-auto">
                <Outlet/>
            </section>
        </div>
      </main>
    </div>
  )
}

export default RootLayout;
