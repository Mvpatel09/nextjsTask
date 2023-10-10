import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import loginSlice from "../redux/slice";
import { useDispatch } from "react-redux";

export default function Dashboard() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [postData, setPostData] = useState([])
    const [editData, setEditData] = useState({
        id: 0,
        title: '',
        body: ''
    })

    function submitForm(e) {
        e.preventDefault();

        axios[editData.id ? 'put' : 'post']('https://dummyjson.com/posts/add', { ...editData, userId: 5 }).then(() => {
            alert('Success')
            setEditData({
                id: 0,
                title: '',
                body: ''
            })
        }).catch(() => {
            alert('Something went wrong')
        })

    }
    function getData() {
        axios.get('https://dummyjson.com/posts').then(({ data }) => {
            setPostData(data.posts)
        })
    }
    function deleteData(id) {
        axios.delete(`https://dummyjson.com/posts/${id}`).then(() => {
            alert('data deleted')
        }).catch(() => {
            alert('Something went wrong')
        })
    }
    function handleChange(e) {
        const { value, name } = e.target
        setEditData((val) => ({ ...val, [name]: value }))
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <h1>Blogs <button onClick={() => {
                dispatch(loginSlice.actions.LogOut())
                router.push('/login')
            }}>Logout</button></h1>
            <form onSubmit={submitForm}>
                <input type="text" placeholder="Title" name='title' value={editData.title} onChange={handleChange} />
                <input type="text" placeholder="Description" name='body' value={editData.body} onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {
                        postData?.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.id}</td>
                                    <td>{e.title}</td>
                                    <td>{e.body}</td>
                                    <td><button onClick={() => {
                                        router.push(`/dashboard/${e.id}`)
                                    }}>View</button></td>
                                    <td><button onClick={() => {
                                        setEditData(e)
                                    }}>Edit</button></td>
                                    <td><button onClick={() => {
                                        deleteData(e.id)
                                    }}>Delete</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </>
    )
}