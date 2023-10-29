import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <h1>Landing Page comes here....</h1>
            <Button variant="primary" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="primary">Signup</Button>
        </div>
    )
}

export default Landing;