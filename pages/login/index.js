import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import loginSlice from "../redux/slice";
import { useRouter } from 'next/navigation'

export default function Test() {
    const dispatch = useDispatch()
    const router = useRouter()

    const d = useSelector(state => state);
    console.log(d)
    const userName = useRef()
    const password = useRef()
    function submitForm(e) {
        e.preventDefault();
        console.log(userName.current.value, password.current.value)
        if (userName.current.value && password.current.value) {
            dispatch(loginSlice.actions.Login())
            router.push('/dashboard')
        } else {
            alert("Enter input")
        }
    }
    return (
        <>
            <form onSubmit={submitForm} action="/" method="post">
                <h1>Login</h1>
                <input type="text" placeholder="Username" ref={userName} />
                <input type="password" placeholder="Password" ref={password} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}
