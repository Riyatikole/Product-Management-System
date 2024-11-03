import React, { useState, useEffect } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getProductRoute, addProductRoute, deleteProductRoute, updateProductRoute } from "../../utils/APIRoutes";

const token = localStorage.getItem("token");
if (!token) {
  console.error("JWT token is not present in localStorage");
}

// Config for axios with token in headers
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState({ id: "", name: "", description: "", price: "" });
  const toast = useToast();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(getProductRoute, config);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error fetching products",
        description: "Unable to retrieve products from the server.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Save a new product
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (productInput.id) {
        // Update existing product
        await axios.put(`${updateProductRoute}/${productInput.id}`, productInput, config);
        toast({
          title: "Successfully Updated",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Add new product
        await axios.post(addProductRoute, productInput, config);
        toast({
          title: "Successfully Saved",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }

      setProductInput({ id: "", name: "", description: "", price: "" }); // Clear input fields
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Failed to Save Product",
        description: "There was an issue saving the product.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteProductRoute}/${id}`, config);
      toast({
        title: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Failed to delete product",
        description: "There was an issue deleting the product.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Populate input fields for editing
  const handleEdit = (product) => {
    setProductInput({ id: product._id, name: product.name, description: product.description, price: product.price });
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={4}>
      {/* Product Input Form */}
      <Box as="form" mb={4} onSubmit={handleSave}>
        <Input
          placeholder="Product Name"
          value={productInput.name}
          onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
          mb={2}
          required
        />
        <Input
          placeholder="Description"
          value={productInput.description}
          onChange={(e) => setProductInput({ ...productInput, description: e.target.value })}
          mb={2}
          required
        />
        <Input
          placeholder="Price"
          type="number"
          value={productInput.price}
          onChange={(e) => setProductInput({ ...productInput, price: e.target.value })}
          mb={2}
          required
        />
        <Button type="submit" colorScheme="purple" mt={2}>
          {productInput.id ? "Update Product" : "Save Product"}
        </Button>
      </Box>

      {/* Product Table */}
      <TableContainer>
        {products.length === 0 ? (
          <Text>No product available</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th isNumeric>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Td>{product.name}</Td>
                  <Td>{product.description}</Td>
                  <Td isNumeric>₹ {product.price}</Td>
                  <Td>
                    <Button colorScheme="teal" size="sm" onClick={() => handleEdit(product)}>
                      Edit
                    </Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(product._id)} ml={2}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default ProductTable;
