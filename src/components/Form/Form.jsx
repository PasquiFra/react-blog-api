import { useEffect, useState } from 'react'
import axios from 'axios'
import './formStyle.scss'

const Form = ({ setError, fetchPosts }) => {

    // Setto l'oggetto data del form per raccogliere i vari campi input
    const setupFormData = {
        title: "",
        content: "",
        image: null,
        category: "",
        tags: [],
        published: null,
        userId: 1
    }

    const [formData, setFormData] = useState(setupFormData);
    const [categories, setcategories] = useState([]);

    // setto i campi di input 
    const tagList = ["Bitcoin", "Digital Gold", "Cryptocurrency", "Ethereum", "Tokens"]
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
            type: 'file',
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
            name: "tags",
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
        if (name === "tags") {
            setFormData(current => {
                const updatedTags = value
                    ? [...current.tags, tagName]
                    : current.tags.filter(tag => tag !== tagName);
                return {
                    ...current,
                    tags: updatedTags
                };
            });
        } else if (name === "image") {
            if (value instanceof File) {
                setFormData(current => ({
                    ...current,
                    image: value
                }));
            }
        } else {
            setFormData(current => ({
                ...current,
                [name]: value
            }));
        }
    }

    const submitForm = async (event) => {
        event.preventDefault()
        const sendPostEndpoint = "http://127.0.0.1:3000/posts"
        setFormData(formData)

        const formDataToSend = new FormData();

        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('categoryId', formData.category);
        formDataToSend.append('published', formData.published);
        formDataToSend.append('userId', formData.userId);

        // Gestione speciale per l'immagine, se presente
        if (formData.image instanceof File) {
            formDataToSend.append('image', formData.image);
        }

        // Gestione speciale per i tags, se presenti
        formData.tags.forEach((tag, index) => {
            formDataToSend.append(`tags[]`, tag);
        });

        try {
            const response = await axios.post(sendPostEndpoint, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Post added successfully:', response.data);
            setFormData(setupFormData)
            fetchPosts()
        }
        catch (err) {
            setError(err.message)
        }
    }

    const fetchCategories = async () => {
        const categoriesEndpoint = "http://localhost:3000/categories";
        try {
            const categories = (await axios.get(categoriesEndpoint)).data;

            setcategories(categories);
        }
        catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <>
            <form onSubmit={submitForm}>
                {/* //! Creazione inputs del form */}
                {inputs.map((input) => {
                    switch (input.type) {
                        case 'checkbox':
                            if (input.name === "tags") {
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
                                        {categories.map(({ name, id }) => {
                                            return (
                                                <option key={`cat-${name}`} value={id}>{name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            );

                        case 'file':
                            return (
                                <div key={input.name}>
                                    <label className="form-check-label w-100" htmlFor={"imageUpload"}>
                                        <strong>{input.label}</strong>
                                    </label>
                                    <input
                                        className={input.className}
                                        id="imageUpload"
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={(event) => handleInputField(input.name, event.target.files[0])}
                                        name={input.name}
                                    >
                                    </input>
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
        </>
    )
}

export default Form