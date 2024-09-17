import React, { useRef, useState} from "react";
import {
    Box,
    Button, Center, Divider,
    Flex,
    FormControl,
    FormHelperText, HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text, VStack
} from "@chakra-ui/react";
import {DeleteIcon, DragHandleIcon, EditIcon, SmallCloseIcon} from "@chakra-ui/icons";
import {Reorder} from "framer-motion";

function TodoForm() {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState("");

    const handleAddOrUpdate = () => {
        if (isEditing) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === editingTodoId ? { ...todo, text: inputValue } : todo
                )
            )
        } else {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: inputRef.current.value,
                },
            ])
        }
        setInputValue("");
        setIsEditing(false);
        setEditingTodoId(null);
        inputRef.current.focus();
    }

    const handleDelete = (id) => {
        let deletedTodos = todos.filter((todo) => todo.id !== id)
        setInputValue('')
        setTodos(deletedTodos)
        setIsEditing(false);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleAddOrUpdate()
        }
    }

    const handleEdit = (todo) => {
        setIsEditing(true)
        setInputValue(todo.text)
        setEditingTodoId(todo.id)
    }

    const handleClearAll = () => {
        setInputValue('')
        setTodos([])
        setIsEditing(false)
    }

    const dragVariants = {
        initial: {
            zIndex: 0,
            opacity: "100%"
        },
        dragging: {
            zIndex: 1,
            opacity: "50%"
        },
    };

    return (
        <Center height="100vh" padding={4}>
            <VStack gap={6} padding={6} maxWidth="lg" bg="gray.100" borderRadius="md" boxShadow="2xl">
                <Box bg="white" p={6} borderRadius="md">
                    <Flex gap={2} width="100%" direction={{
                        base: "column",
                        lg: 'row'
                        }}>
                        <FormControl >
                            <InputGroup>
                                <Input value={inputValue} onKeyDown={handleKeyDown} onChange={(e) => setInputValue(e.currentTarget.value)} ref={inputRef} isInvalid={false} />
                                <InputRightElement>
                                    <IconButton
                                        icon={<SmallCloseIcon />}
                                        size="xs"
                                        isDisabled={inputValue.length <= 0}
                                        onClick={() => {
                                            setInputValue('')
                                            setIsEditing(false)
                                        }} disabled={inputValue.length <= 0} aria-label="wyczyść"
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText color="gray.400" fontSize="small">Liczba znaków: {inputValue.length}/40</FormHelperText>
                        </FormControl>
                        <Button px={6} colorScheme="green" onClick={handleAddOrUpdate} isDisabled={inputValue.length <= 0 || inputValue.length >= 40}>{isEditing ? 'Aktualizuj' : 'Dodaj'}</Button>
                    </Flex>
                    <Divider borderColor="gray.200" my={6} />
                    <Flex width="100%" minH={{
                        base: "200px",
                        lg: "300px"
                    }} justifyContent={todos.length > 0 ? 'flex-start' : 'center' } alignItems={todos.length > 0 ? 'flex-start' : 'center'}>
                        {todos.length > 0 ? (
                                <VStack width="100%" overflowY="auto" maxH={{
                                    base: "200px",
                                    lg: "300px"
                                }} position="relative" as={Reorder.Group} axis="y" onReorder={setTodos} values={todos}>
                                    {
                                        todos.map((todo) => (
                                            <Flex justifyContent="space-between" alignItems="center" key={todo.id} padding={4} bg="#f9f9f9" w="100%" borderRadius="md" as={Reorder.Item} value={todo} variants={dragVariants} initial="initial" whileDrag="dragging" dragTransition={{
                                                bounceStiffness: 600,
                                            }}>
                                                <HStack gap={2}>
                                                    <DragHandleIcon color="gray.400" cursor="move" />
                                                    <Text color="gray.500">{todo.text}</Text>
                                                </HStack>
                                                <Flex gap="2">
                                                    <IconButton
                                                        size="xs"
                                                        colorScheme='blue'
                                                        icon={<EditIcon />}
                                                        onClick={() => handleEdit(todo)} disabled={inputValue.length <= 0} aria-label="wyczyść"
                                                    />
                                                    <IconButton
                                                        size="xs"
                                                        colorScheme='red'
                                                        icon={<DeleteIcon />}
                                                        onClick={() => handleDelete(todo.id)} disabled={inputValue.length <= 0} aria-label="wyczyść"
                                                    />
                                                </Flex>
                                            </Flex>
                                        ))
                                    }
                                </VStack>
                            ) :
                            <Text color="gray.400">Brak danych</Text>
                        }
                    </Flex>
                </Box>
                <Button colorScheme="red" variant="link" isDisabled={todos.length <= 0} size="xs" onClick={handleClearAll}>wyczyść listę</Button>
            </VStack>
        </Center>
    )
}

export default TodoForm;