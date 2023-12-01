import React, { useState, useEffect } from 'react';

const Home = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const storedMenu = localStorage.getItem("menu");
        if (storedMenu) {
            setMenu(JSON.parse(storedMenu));
        }
    }, []);


    function showMenu() {
        if (menu.length === 0) {
            return <p>Empty menu</p>;
        }
        return menu.map((dish, index) => (
            <p className='menuDishes' key={index}>Dish {index}: {dish}</p>
        ));
    }

    return (
        <div className="mainFunctions">
            <h2>Overview</h2>
            <div className="features">
                <h4>Current Menu:</h4>
                {showMenu()}
            </div>
        </div>
    );
};

export default Home;