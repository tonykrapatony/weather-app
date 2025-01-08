import Footer from './components/Footer/Footer'
import Forecast from './components/Forecast/Forecast'
import GeoSearch from './components/GeoSearch/GeoSearch'
import Header from './components/Header/Header'

function App() {

  return (
    <>
      <Header />
      <div className="container min-h-full-144 mx-auto px-4 py-5 md:px-0">
        <GeoSearch />
        <Forecast />
      </div>
      <Footer />
    </>
  )
}

export default App
