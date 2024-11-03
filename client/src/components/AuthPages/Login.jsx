import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Box,
  Center,
  Flex,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/APIRoutes";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginRoute, data);

      localStorage.setItem("token", response.data.data);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;

        toast({
          title: errorMessage,
          position: "top-right",
          isClosable: true,
        });
      } else {
        console.log("An error occurred:", error);
        toast({
          title: "Incorrect Email or Password",
          position: "top-right",
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Center h="100vh">
        <Box boxShadow="lg" rounded="50px">
          <Flex>
            <Flex bg="pink.300" p="6" rounded="50px" alignItems={"center"}>
              New to us?{" "}
              <Link color="teal.500" href="/signup">
                Register
              </Link>
            </Flex>

            <Flex p="6">
              <VStack spacing={4} align="stretch" maxW="md" m="auto">
                <Center>
                  <Text
                    fontWeight="extrabold"
                    bgGradient="linear(to-r, pink.500, pink.700, blue.800)"
                    bgClip="text"
                    fontSize={"25px"}
                  >
                    LogIn
                  </Text>
                </Center>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        onClick={handleTogglePassword}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  bg="pink.300"
                  _hover={{ bg: "pink.400" }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </VStack>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
