import { Box, Flex, Text, Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import ProductTable from "./ProductTable";
import { AiOutlineLogout } from "react-icons/ai";

export default function Home() {
  const toast = useToast();

    //Function to Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    toast({
      title: "Sucessfully Logged Out",
      position: "top-right",
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    toast({
      title: "Welcome",
      position: "top-right",
      status: "success",
      isClosable: true,
    });
  }, []);

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} p="7px">
        <Flex alignItems={"center"}>
          <Text
            fontWeight="extrabold"
            bgGradient="linear(to-r, pink.500, pink.700, blue.800)"
            bgClip="text"
            fontSize="30px"
          >
            Product Management System
          </Text>
        </Flex>
        <Flex ml="750px" alignItems={"center"}>
          <Tooltip label="logout" hasArrow>
            <Box
              bg="pink.100"
              p="5px"
              borderRadius={"50%"}
              _hover={{ cursor: "pointer" }}
            >
              {" "}
              <AiOutlineLogout onClick={handleLogout} />{" "}
            </Box>
          </Tooltip>
        </Flex>
      </Flex>

      <Box width="95%" height="500px">
        <ProductTable />
      </Box>
    </>
  );
}
