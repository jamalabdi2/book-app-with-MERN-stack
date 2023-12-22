
import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to homepage</h1>
            <button onClick={() => navigate('footer')}>Go to Footer page</button>
        </div>
    )
}