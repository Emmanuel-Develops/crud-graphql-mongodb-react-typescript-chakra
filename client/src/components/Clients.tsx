import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";

// chakra
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  SkeletonText,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

// types
import { ClientType } from "types";

// components
import ClientRow from "./ClientRow";

// queries
import { GET_CLIENTS } from "queries/clientQueries";
import { DeleteIcon } from "@chakra-ui/icons";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  // function skeletonDuplicates(amount = 1) {
  //   const elementArray = {}
  //   React.Children
  //   return (
  //     <>

  //     </>
  //   )
  // }

  const LoadingSkeleton = () => {
    return (
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>

              <Td>
                <Button variant="delete">
                  <DeleteIcon />
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>

              <Td>
                <Button variant="delete">
                  <DeleteIcon />
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box my={10}>
      <Text fontSize="16px" fontWeight="bold" my={2} >
        CLIENTS
      </Text>
      {loading && <LoadingSkeleton />}
      {error && <p>something went wrong</p>}
      {!loading && !error && (
        <TableContainer>
          <Table variant={"striped"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.clients.map((client: ClientType) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Clients;
