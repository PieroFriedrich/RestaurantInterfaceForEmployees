import React, { useState, useEffect } from 'react';

function ServerInterface() {

    const [menu, setMenu] = useState([]);
    const [table, setTable] = useState(1);
    const [dishIndex, setDishIndex] = useState(0);
    const [tableOrders, setTableOrders] = useState({});
    const [singleTable, setSingleTable] = useState([]);

    useEffect(() => {
        const storedMenu = localStorage.getItem("menu");
        if (storedMenu) {
            setMenu(JSON.parse(storedMenu));
        }
    }, []);

    useEffect(() => {
        const storedTable = localStorage.getItem("table");
        if (storedTable) {
            setTable(JSON.parse(storedTable));
        }
    }, []);

    useEffect(() => {
        const storedTableOrders = localStorage.getItem("tableOrders");
        if (storedTableOrders) {
            setTableOrders(JSON.parse(storedTableOrders));
        } else {
            const initialOrders = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
            setTableOrders(initialOrders);
            localStorage.setItem('tableOrders', JSON.stringify(initialOrders));
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

    function addOrderToTable() {
        const orders = [...tableOrders[table], menu[dishIndex]];
        setTableOrders({ ...tableOrders, [table]: orders });
        localStorage.setItem('tableOrders', JSON.stringify({ ...tableOrders, [table]: orders }));
    }

    function clearTable() {
        setTableOrders({ ...tableOrders, [table]: [] });
        localStorage.setItem('tableOrders', JSON.stringify({ ...tableOrders, [table]: [] }));
    }

    function removeOrderFromTable() {
        const dishName = menu[dishIndex];
        const currentTableOrders = { ...tableOrders };
        
        if (currentTableOrders[table]) {
            const orderIndex = currentTableOrders[table].indexOf(dishName);

            if (orderIndex !== -1) {
                const updatedOrders = [...currentTableOrders[table]];
                updatedOrders.splice(orderIndex, 1);
                setTableOrders({ ...currentTableOrders, [table]: updatedOrders });
                localStorage.setItem('tableOrders', JSON.stringify({ ...currentTableOrders, [table]: updatedOrders }));
            }
        }
    }

    function viewTable() {
        const orders = JSON.parse(localStorage.getItem('tableOrders'));
        setSingleTable(orders[table]);
    }

    return (
        <div className="mainFunctions">
            <h2>Server Interface</h2>
            <br/>
            <div className="features">
                <h4>Add order to a table:</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Table Number: 
                        <input type="number" min={1} max={7} value={table} onChange={(e) => setTable(e.target.value)} />
                    </label>
                    <br/>
                    <label>
                        Dish Number:
                        <input type="number" min={0} max={menu.length - 1} value={dishIndex} onChange={(e) => setDishIndex(e.target.value)}/>
                    </label>
                    <br/>
                    <button onClick={addOrderToTable}>Add an order</button>
                </form>
            </div>
            <br/>
            <div className="features">
                <h4>Clear a table:</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Table Number: 
                        <input type="number" min={1} max={7} value={table} onChange={(e) => setTable(e.target.value)} />
                    </label>
                    <br/>
                    <button onClick={clearTable}>Clear table</button>
                </form>
            </div>
            <br/>
            <div className="features">
                <h4>Remove an order from a table:</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Table Number: 
                        <input type="number" min={1} max={7} value={table} onChange={(e) => setTable(e.target.value)}/>
                    </label>
                    <br/>
                    <label>
                        Dish Number:
                        <input type="number" min={0} max={menu.length - 1} value={dishIndex} onChange={(e) => setDishIndex(e.target.value)}/>
                    </label>
                    <br/>
                    <button onClick={removeOrderFromTable}>Remove the order</button>
                    {}
                </form>
            </div>
            <br/>
            <div className="features">
                <h4>View orders from a table:</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Table Number: 
                        <input type="number" min={1} max={7} value={table} onChange={(e) => setTable(e.target.value)}/>
                    </label>
                    <br/>
                    <button onClick={viewTable}>View table orders</button>
                    <br/>
                    <p>Table {table} ordered: {singleTable.map((order, index) => <span key={index}>{order}. </span>)}</p>
                </form>
            </div>
            <br/>
            <div className="features">
                <h4>Our Menu:</h4>
                {showMenu()}
            </div>
        </div>
    );
};

export default ServerInterface;