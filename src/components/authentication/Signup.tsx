import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import Api from "../../api/Api";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Confirm password has to be the same as password");
    } else {
      const data = {
        name: name,
        email: email,
        password: password,
        avatar: "",
      };
      performApi(data);
    }
  };

  const performApi = async (data) => {
    // loading phase
    setLoading(true);
    try {
      const result = await Api().post("/user/create-user", data);
      const response = await result.data;
      // api success response
      setLoading(false);
      setErrorApi(false);
      console.log(response);
    } catch {
      // api failed response
      setLoading(false);
      setErrorApi(true);
    }
  };

  return (
    <VStack spacing="5px">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            min={6}
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

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

        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={"password"}
              placeholder="Re-enter your password again"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Upload Image</FormLabel>
          <Input
            accept="image/*"
            type="file"
            placeholder="Enter your Name"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </FormControl>

        {loading ? (
          <Button style={{ marginTop: 15 }} width="100%">
            <Spinner /> Loading...
          </Button>
        ) : (
          <input
            type="submit"
            width="100%"
            color="white"
            className="btn btn-submit"
            style={{ marginTop: 15, display: "block" }}
            value="Sign In"
          />
        )}
      </form>
    </VStack>
  );
};
