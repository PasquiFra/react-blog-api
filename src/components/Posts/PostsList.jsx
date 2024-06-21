import './posts.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

const PostsList = ({ setError }) => {

    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({});

    const fetchPosts = async () => {
        const postsEndpoint = 'http://127.0.0.1:3000/posts'
        try {
            const fetchedPosts = (await axios.get(postsEndpoint)).data.data
            console.log(fetchedPosts)
            if (fetchedPosts) {
                setPosts(fetchedPosts)
            }
        } catch (error) {
            setError(err.message)
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
        <div>
            <ul id="posts-list">
                {/* stampa dei posts */}
                {
                    posts.map((post, index) => {
                        return (
                            <li key={`post-${index}`} >
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <div>
                                    <strong>Categoria:</strong>{post.category.name}
                                </div>
                                <div>
                                    <strong>Tags:</strong>
                                    {
                                        post.tags.map((tag, index) => {
                                            return (
                                                <span
                                                    key={`tag-${tag.name}-${index}`}
                                                    className="mx-2">
                                                    {tag.name}
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                                <figure>
                                    <img src={images[post.slug]} alt={`foto-post-${post.index}`} />
                                </figure>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PostsList