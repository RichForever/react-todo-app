import React, {useEffect} from 'react';
import TodoWrapper from "./TodoWrapper";

const Todo = () => {

    useEffect(() => {
        const colorMode = localStorage.getItem('chakra-ui-color-mode')
        if(colorMode && colorMode !== 'light') {
            localStorage.setItem("chakra-ui-color-mode", "light");
        }
    }, []);
    return (
        <div>
            <TodoWrapper />
        </div>
    );
};

export default Todo;