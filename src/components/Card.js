import React from 'react';

const Card = () => {
    return (
        <div className="row">
            <div className="card-deck-wrapper">
                <div className="card-deck">
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">Card title</h4>
                            <p className="card-text">This is a longer.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">Card title</h4>
                            <p className="card-text">This card has supporting.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">Card title</h4>
                            <p className="card-text">This is a wider card with supporting.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};