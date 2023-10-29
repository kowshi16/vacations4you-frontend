import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="App">
            <h1>Landing Page comes here....</h1>
            <Link to="/login">
                <Button variant="primary">Login</Button>
            </Link>

            <Button variant="primary">Signup</Button>
        </div>
    )
}

export default Landing;