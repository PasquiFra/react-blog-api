import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import Form from "./components/Form/Form"
import Alert from "./components/Alert/Alert"
import PostsList from "./components/Posts/PostsList"

function App() {

  const [error, setError] = useState(null);

  return (
    <>
      <Header />
      <main className='container'>
        <Form setError={(error) => setError(error)}></Form>
        <PostsList setError={(error) => setError(error)} />
      </main>
      <Footer />
      <Alert error={error}></Alert>

    </>
  )
}

export default App
