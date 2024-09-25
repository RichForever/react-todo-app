import React, { useState } from 'react';
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { Reorder } from "framer-motion";
const TodoItem = ({ todo, todos, setTodos }) => {
    const { id, text, completed } = todo;

    const variants = {
        notDragging: {
            zIndex: 0,
            opacity: "100%",
        },
        dragging: {
            zIndex: 1,
            opacity: "50%"
        },
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleDelete = (id) => {
        setTodos((prevTodos) => prevTodos.filter((e) => e.id !== id));
    };

    const handleEdit = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: editedText } : todo
            )
        );
        setIsEditing(false);
    };

    const handleCompleted = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <Flex as={Reorder.Item} value={todo} dragTransition={{ bounceStiffness: 600 }} variants={variants} whileDrag="dragging" initial="notDragging" gap={2} alignItems="center" justifyContent="space-between" width="100%" backgroundColor={completed ? 'gray.400' : 'gray.100'} p={4} onDoubleClick={() => handleCompleted(id)} borderRadius="lg">
            {isEditing ? (
                <Input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={() => handleEdit(id)} // Save when input loses focus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEdit(id); // Save when pressing Enter
                        }
                    }}
                    autoFocus
                />
            ) : (
                <span>{text}</span>
            )}
            <Flex gap={2}>
                {isEditing ? (
                    <IconButton
                        size="xs"
                        colorScheme="green"
                        onClick={() => handleEdit(id)}
                        icon={<CheckIcon />}
                        aria-label="Save todo"
                    />
                ) : (
                    <IconButton
                        size="xs"
                        colorScheme="blue"
                        onClick={() => setIsEditing(!isEditing)}
                        icon={<EditIcon />}
                        aria-label="Edit todo"
                    />
                )}
                <IconButton
                    size="xs"
                    colorScheme="red"
                    onClick={() => handleDelete(id)}
                    icon={<DeleteIcon />}
                    aria-label="Delete todo"
                />
            </Flex>
        </Flex>
    );
};

export default TodoItem;
