import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function View() {
    const router = useRouter()
    const [getData, setData] = useState({})

    useEffect(() => {
        if (router.query.id) {
            axios.get(`https://dummyjson.com/posts/${router.query.id}`).then(({ data }) => {
                setData(data)
            })
        }
    }, [router.query.id])
    return (
        <>
            <title>{getData?.title}</title>
            <meta
                name="description"
                content={getData?.body}
            />
            <h1>View</h1>
            <h2>Title</h2>
            <p>{getData?.title}</p>
            <h2>Description</h2>
            <p>{getData?.body}</p>
        </>
    )
}