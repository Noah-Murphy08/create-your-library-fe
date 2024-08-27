import CommentForm from "../components/CommentForm/CommentForm";

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/books`;


const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (bookId) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (bookFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookFormData),
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const createComment = async (bookId, CommentFormData) => {
    try{
        const res = await fetch(`${BASE_URL}/${bookId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(CommentFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}


export {
    index,
    show,
    create,
    createComment,
}