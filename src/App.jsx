import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import Form from "./components/Form/Form"
import Alert from "./components/Alert/Alert"
import PostsList from "./components/Posts/PostsList"

function App() {

  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});

  const fetchPosts = async () => {
    const postsEndpoint = 'http://127.0.0.1:3000/posts'
    try {
      const fetchedPosts = (await axios.get(postsEndpoint)).data.data
      if (fetchedPosts) {
        setPosts(fetchedPosts)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const fetchPostsImages = async (imageName, slug) => {
    const imagesEndpoint = "http://127.0.0.1:3000/images/";
    try {
      const res = await axios.get(`${imagesEndpoint}${imageName}`, { responseType: 'blob' });
      const image = URL.createObjectURL(res.data)

      // salvataggio delle immagini
      setImages(prevImages => ({ ...prevImages, [slug]: image }));

    } catch (error) {
      console.error("immagine non trovata")
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    posts.forEach(post => {
      if (post.image) {
        fetchPostsImages(post.image, post.slug);
      }
    });
  }, [posts])

  return (
    <>
      <Header />
      <main className='container'>
        <Form setError={(error) => setError(error)} fetchPosts={() => fetchPosts()}></Form>
        <PostsList setError={(error) => setError(error)} posts={posts} images={images} />
      </main>
      <Footer />
      <Alert error={error}></Alert>

    </>
  )
}

export default App
