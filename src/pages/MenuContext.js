import { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
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
    }

    function removeDish() {
    }

    function showMenu() {
    }

    const contextValue = {
        menu,
        setMenu,
        dishName,
        setDishName,
        removeIndex,
        setRemoveIndex,
        addDish,
        removeDish,
        showMenu,
    };

    return (
        <MenuContext.Provider value={contextValue}>
            {children}
        </MenuContext.Provider>
    );
};
