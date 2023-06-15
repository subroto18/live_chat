import style from "../styles/home.module.css";
import { Container, Box } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Login } from "./authentication/login";
import { Signup } from "./authentication/signup";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const Home = () => {
  useEffect(() => {
    const socket = io();

    socket.on("message", (msg) => {
      console.log(msg);
    });

    console.log(socket);
  }, []);

  return (
    <div className={style.home__body}>
      <Container p={10} textAlign="center" maxW="md" color="white">
        <Box fontWeight="bold" padding="4" bg="white" color="black" maxW="md">
          Live chat
        </Box>

        <Box padding="4" bg="white" color="black" maxW="md">
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};
