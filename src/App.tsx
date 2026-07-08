import Backdrop from './components/Backdrop'
import Menubar from './components/Menubar'
import Hero from './components/Hero'
import Providers from './components/Providers'
import Loop from './components/Loop'
import Tools from './components/Tools'
import Rag from './components/Rag'
import Protocols from './components/Protocols'
import Palette from './components/Palette'
import Footer from './components/Footer'
import StatusBar from './components/StatusBar'

export default function App() {
  return (
    <>
      <Backdrop />
      <Menubar />
      <main className="relative">
        <Hero />
        {/* hairline dividers between sections for editorial rhythm */}
        <Providers />
        <Loop />
        <Tools />
        <Rag />
        <Protocols />
        <Palette />
        <Footer />
      </main>
      <StatusBar />
    </>
  )
}
