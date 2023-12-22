import { useNavigate } from "react-router-dom"

export default function Footer(){
    const navigate = useNavigate();
    return(
        <div>
            <h1>This is a footer page</h1>
            <button onClick={() => navigate('/')}>Go back</button>
        </div>
    )
}