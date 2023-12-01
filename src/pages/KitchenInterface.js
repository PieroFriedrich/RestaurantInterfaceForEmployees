import React, { useState, useEffect } from 'react';

function KitchenInterface() {
    const [menu, setMenu] = useState([]);
    const [dishName, setDishName] = useState('');
    const [removeIndex, setRemoveIndex] = useState('');

    useEffect(() => {
        const storedMenu = localStorage.getItem("menu");
        if (storedMenu) {
            setMenu(JSON.parse(storedMenu));
        }
    }, []);

    function addDish() {
        if (dishName.trim() === '') {
            return;
        }
        const newMenu = [...menu, dishName];
        setMenu(newMenu);
        localStorage.setItem("menu", JSON.stringify(newMenu));
        setDishName('');
    }

    function removeDish() {
        if (removeIndex === '') {
            return;
        }

        const indexToRemove = parseInt(removeIndex, 10);
        if (isNaN(indexToRemove) || indexToRemove < 0 || indexToRemove >= menu.length) {
            return;
        }

        const newMenu = [...menu];
        newMenu.splice(indexToRemove, 1);
        setMenu(newMenu);
        localStorage.setItem("menu", JSON.stringify(newMenu));
    }

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
            <h2>Kitchen Interface</h2>
            <br/>
            <div className="features">
                <h4>Add a new dish to the menu:</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Dish Name:
                        <input 
                            value={dishName} 
                            onChange={(e) => setDishName(e.target.value)}
                        />
                    </label>
                    <button onClick={addDish}>Add dish</button>
                </form>
            </div>
            <br/>
            <div className="features">
                <h4>Remove a dish from the menu:</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Dish Index:
                        <input 
                            type="number"
                            min={0}
                            max={menu.length - 1}
                            value={removeIndex} 
                            onChange={(e) => setRemoveIndex(e.target.value)}
                        />
                    </label>
                    <button onClick={removeDish}>Remove</button>
                </form>
            </div>
            <br/>
            <div className="features">
                <h4>Current Menu:</h4>
                {showMenu()}
            </div>
        </div>
    );
};

export default KitchenInterface;
