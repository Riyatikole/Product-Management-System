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
  Flex,
  Box,
  Center,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signUpRoute } from "../../utils/APIRoutes";

export default function SignUp() {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(signUpRoute, inputData);
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast({
        title: "Please Enter All the Details",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh">
      <Box boxShadow="lg" rounded="50px">
        <Flex>
          
          <Flex p="6">
            <VStack spacing={4} align="stretch" maxW="md" m="auto">
              <Center>
                <Text
                  fontWeight="extrabold"
                  bgGradient="linear(to-r, pink.500, pink.700, blue.800)"
                  bgClip="text"
                  fontSize={"25px"}
                >
                  Register
                </Text>
              </Center>

              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={inputData.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={inputData.lastName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputData.password}
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
                Sign Up
              </Button>
            </VStack>
          </Flex>
          <Flex bg="pink.300" p="6" rounded="50px" alignItems={"center"}>
            Already Register?{" "}
            <Link color="teal.500" href="/login">
              LogIn
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
}
