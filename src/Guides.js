import React from 'react';
import './App.css';
import Navbar from './Navbar';

function Guides() {
    return (
        <div>
            <Navbar />
            <div className="container my-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="bg-light p-4 text-center">
                            <h1>AN EYE FOR AN EYE: makes the whole world puppets of the timeless...</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Guides;