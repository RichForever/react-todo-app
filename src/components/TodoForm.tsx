import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel, IconButton,
    Input,
    InputGroup,
    InputRightElement,
    VStack
} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";

const TodoForm = ({ setTodos, todos }) => {
    const [value, setValue] = useState("")
    const [characters, setCharacters] = useState(0)

    const handleSubmit = (e) => {

        e.preventDefault();

        setTodos([
            ...todos,
            {
                id: Date.now(),
                text: value,
                completed: false,
            }
        ])

        setValue("")
    }

    useEffect(() => {
        setCharacters(value.length)
    }, [value])

    return (
        <Box background="white" borderColor="gray.100" borderWidth="1px" p={4} borderRadius="lg" width="100%">
            <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                    <FormControl>
                        <FormLabel>Add todo</FormLabel>
                        <InputGroup>
                            <Input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
                            <InputRightElement>
                                <IconButton isDisabled={!value} size="xs" aria-label="Clear" icon={<SmallCloseIcon />} onClick={() => setValue('')} />
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText>Characters {characters}/30</FormHelperText>
                    </FormControl>
                    <Button width="100%" display="inline-flex" colorScheme="blue" type="submit" isDisabled={characters <= 0 || characters >= 30}>Add</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default TodoForm;