import React from 'react';
import TodoItem from './TodoItem';
import {Divider, VStack, Text, Flex} from "@chakra-ui/react";
import { Reorder } from "framer-motion";
const TodoList = ({ todos, setTodos }) => {
    return (
        <VStack as={Reorder.Group} axis="y" values={todos} onReorder={setTodos} backgroundColor="white" gap={2} p={4} divider={<Divider />} borderRadius="lg" overflowY="auto" minH="400px" maxH="400px" width="100%" height="100%" borderColor="gray.100" borderWidth="1px" position="relative">
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem todo={todo} setTodos={setTodos} todos={todos} key={todo.id} />
                ))
            ) : (
                <Flex width="100%" height="100%" flexGrow={1} alignItems="center" justifyContent="center">
                    <Text color="gray.500">No Todos found.</Text>
                </Flex>
            )}
        </VStack>
    );
};

export default TodoList;