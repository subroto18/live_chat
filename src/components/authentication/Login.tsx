import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";

import { VStack } from "@chakra-ui/layout";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        color="white"
        style={{ marginTop: 15 }}
      >
        Get Guest User Credemtials
      </Button>
    </VStack>
  );
};
