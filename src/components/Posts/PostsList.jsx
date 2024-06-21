import './posts.scss'


const PostsList = ({ posts, images }) => {


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