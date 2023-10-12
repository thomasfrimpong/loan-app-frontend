import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import dataSource from "@/hooks/dataSource";

import LinearIndeterminate from "@/app/loading";
import { Customer } from "@/utils/interfaces";
import dataEntry from "@/hooks/dataEntry";
import { useSession } from "next-auth/react";

export default function BasicTable() {
  const { getCustomers } = dataEntry();
  const { data: session, status } = useSession({
    required: true,
  });
  //   console.log(session);
  const token = session?.user.api_token;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomers(token);
        setCustomers(data);
        console.log(customers);
      } catch (error) {}
    }
    fetchData();
    setLoading(false);
  }, [token]);

  if (loading) {
    return <LinearIndeterminate />;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name of Customer</TableCell>
            <TableCell align="right">
              <b>Phone Number</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Address</b>&nbsp;
            </TableCell>

            <TableCell align="right">
              <b>Email</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Marital Status</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>ID Card</b>&nbsp;
            </TableCell>

            <TableCell>
              <b>Date Added</b>&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={customer.id}
            >
              <TableCell component="th" scope="row">
                {customer.first_name} {customer.last_name}
              </TableCell>
              <TableCell align="right">{customer.phone_number} </TableCell>
              <TableCell align="right">{customer.address}</TableCell>
              <TableCell align="right">{customer.email}</TableCell>
              <TableCell align="right">{customer.marital_status}</TableCell>
              <TableCell align="right">{customer.id_card}</TableCell>
              <TableCell>{customer.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
