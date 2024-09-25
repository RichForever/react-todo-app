import React, {useState} from 'react';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import {Center, VStack} from "@chakra-ui/react";
import {ITodoItem} from "../types";

const TodoWrapper = () => {

    const [todos, setTodos] = useState<ITodoItem[]>([]);

    return (
        <Center p={8} backgroundColor="white" height="100vh" borderColor="gray.100" borderWidth="1px">
            <VStack maxW="500px" width="100%" gap={4} backgroundColor="gray.50" padding={4} borderRadius="xl">
                <TodoForm setTodos={setTodos} todos={todos} />
                <TodoList todos={todos} setTodos={setTodos} />
            </VStack>
        </Center>
    );
};

export default TodoWrapper;