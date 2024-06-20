import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import Form from "./components/Form/Form"
import Alert from "./components/Alert/Alert"

function App() {

  const [error, setError] = useState(null);

  return (
    <>
      <Header />
      <main className='container'>
        <Form setError={setError}></Form>
      </main>
      <Footer />
      <Alert error={error}></Alert>

    </>
  )
}

export default App
