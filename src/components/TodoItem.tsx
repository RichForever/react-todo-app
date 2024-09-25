import React, {Dispatch, SetStateAction, useState} from 'react';
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { Reorder } from "framer-motion";
import { ITodoItem, ITodoItemProps } from "../types";

const TodoItem: React.FC<ITodoItemProps> = ({ todo, setTodos }) => {
    const { id, text, completed }: ITodoItem = todo;

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

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(text);

    const handleDelete = (id: number) => {
        setTodos((prevTodos: ITodoItem[]) => prevTodos.filter((e) => e.id !== id));
    };

    const handleEdit = (id: number) => {
        if(editedText.length === 0) return;
        setTodos((prevTodos: ITodoItem[]) =>
            prevTodos.map((todo: ITodoItem) =>
                todo.id === id ? { ...todo, text: editedText } : todo
            )
        );
        setIsEditing(false);
    };

    const handleCompleted = (id: number) => {
        setTodos((prevTodos: ITodoItem[]) =>
            prevTodos.map((todo: ITodoItem) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <Flex as={Reorder.Item} value={todo} dragTransition={{ bounceStiffness: 600 }} variants={variants} whileDrag="dragging" initial="notDragging" gap={2} alignItems="center" justifyContent="space-between" width="100%" backgroundColor={completed ? 'gray.400' : 'gray.100'} p={4} onDoubleClick={() => handleCompleted(id)} borderRadius="lg">
            {isEditing ? (
                <Input
                    value={editedText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedText(e.target.value)}
                    onBlur={() => handleEdit(id)} // Save when input loses focus
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
                        isDisabled={editedText.length === 0}
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
