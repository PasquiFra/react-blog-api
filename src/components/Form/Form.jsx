import { useState } from "react"
import './formStyle.scss'

const Form = ({ setError }) => {

    // Setto l'oggetto data del form per raccogliere i vari campi input
    const setupFormData = {
        title: "",
        content: "",
        image: "",
        category: "",
        tags: [],
        published: null
    }

    const [formData, setFormData] = useState(setupFormData);
    const [posts, setPosts] = useState([]);

    // setto i campi di input 
    const tagList = ["Bitcoin", "Digital Gold", "Cryptocurrency", "Ethereum", "Tokens"]
    const categoryList = ["Informatics", "Economics", "Finance", "Politics"]
    const inputs = [
        {
            label: "Titolo",
            type: 'text',
            name: 'title',
            placeholder: 'Inserisci un titolo...',
            className: 'form-control'
        },
        {
            label: "Descrizione",
            type: 'text',
            name: "content",
            placeholder: 'Inserisci una descrizione...',
            className: 'form-control'
        },
        {
            label: "Immagine",
            type: 'text',
            name: "image",
            placeholder: 'Inserisci il link ad una immagine',
            className: 'form-control'
        },
        {
            label: "Categoria",
            type: 'select',
            name: "category",
            placeholder: 'Inserisci una categoria...',
            className: 'form-select'
        },
        {
            label: "Tags",
            type: 'checkbox',
            name: "tags[]",
            className: 'ms-2'
        },
        {
            label: "Pubblicato",
            type: 'checkbox',
            name: "published",
            className: 'ms-2'
        },
    ]

    const handleInputField = (name, value, tagName) => {
        console.log(name, value, tagName)
        if (name === "tags[]") {
            setFormData(current => {
                const updatedTags = value
                    ? [...current.tags, tagName]
                    : current.tags.filter(tag => tag !== tagName);
                return {
                    ...current,
                    tags: updatedTags
                };
            });
        } else {
            setFormData(current => ({
                ...current,
                [name]: value
            }));
        }
    }

    const submitForm = (event) => {
        event.preventDefault()
        try {
            console.log(formData)
            setPosts(currentPosts => ([...currentPosts, formData]))
            setFormData(setupFormData)
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <form onSubmit={submitForm}>
                //! Creazione inputs del form
                {inputs.map((input) => {
                    switch (input.type) {
                        case 'checkbox':
                            if (input.name === "tags[]") {
                                return (
                                    <div className="w-100 my-2" key={input.name}>
                                        <label className="form-check-label w-100">
                                            <strong>{input.label}</strong>
                                        </label>
                                        {tagList.map(tag => {
                                            return (
                                                <label
                                                    key={`tag-${tag.toLowerCase().split(' ').join('-')}`}
                                                    className="me-4">
                                                    {tag}
                                                    <input
                                                        id={`tag-${tag.toLowerCase().split(' ').join('-')}`}
                                                        type={input.type}
                                                        name={input.name}
                                                        onChange={(event) => handleInputField(input.name, event.target.checked, tag)}
                                                        className={input.className}
                                                    />
                                                </label>
                                            )
                                        })}

                                    </div>
                                );
                            } else {
                                return (
                                    <div className="w-100 my-2" key={input.name}>
                                        <label className="form-check-label" htmlFor={`input-${input.name}`}>
                                            <strong>{input.label}</strong>
                                        </label>
                                        <input
                                            id={`input-${input.name}`}
                                            type={input.type}
                                            name={input.name}
                                            onChange={(event) => handleInputField(input.name, event.target.checked)}
                                            className={input.className}
                                        />
                                    </div>
                                )
                            }

                        case 'select':
                            return (
                                <div key={input.name}>
                                    <label className="form-check-label w-100" htmlFor={`input-${input.name}`}>
                                        <strong>{input.label}</strong>
                                    </label>
                                    <select
                                        className={input.className}
                                        id={`input-${input.name}`}
                                        onChange={(event) => handleInputField(input.name, event.target.value)}
                                        name={input.name}
                                    >
                                        <option defaultValue={'selected'}>{input.placeholder}</option>
                                        {categoryList.map((cat, index) => {
                                            return (
                                                <option key={`cat-${cat}`} value={cat}>{cat}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            );

                        default:
                            return (
                                <div key={input.name} className=" my-2">
                                    <label className="form-check-label" htmlFor={`input-${input.name}`}>
                                        <strong>{input.label}</strong>
                                    </label>
                                    <input
                                        id={`input-${input.name}`}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        onChange={(event) => handleInputField(input.name, event.target.value)}
                                        className={input.className}
                                    />
                                </div>
                            )
                    }
                })}

                <button type="submit" className="btn btn-success my-3">Aggiungi</button>
            </form>
            <div className="my-4">
                <h3>I tuoi posts:</h3>
                <ul id="posts-list">
                    //! stampa dei posts
                    {
                        posts.map((post, index) => {
                            return (
                                <li key={`post-${index}`} >
                                    <h3>{post.title}</h3>
                                    <p>{post.content}</p>
                                    <div>
                                        <strong>Categoria:</strong>{post.category}
                                    </div>
                                    <div>
                                        <strong>Tags:</strong>
                                        {
                                            post.tags.map((tag, index) => {
                                                return (
                                                    <span
                                                        key={`tag-${tag}-${index}`}
                                                        className="mx-2">
                                                        {tag}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                    <figure>
                                        <img src={post.image} alt={`foto-post-${post.index}`} />
                                    </figure>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Form