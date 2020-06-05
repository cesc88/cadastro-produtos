import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
    return(
        <div className="jumbotron">
            <h1 className="display-3">Welcome!</h1>
            <p className="lead">Small application for product registration</p>
            <hr className="my-4"/>
            <p>Register simply and quickly, gaining productivity and agility.</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/cadastro-produtos" role="button">Register</Link>
            </p>
        </div>
    )
}

export default Home;