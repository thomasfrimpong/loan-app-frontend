import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import dataSource from "@/hooks/dataSource";

import LinearIndeterminate from "@/app/loading";
import { LoanDetails } from "@/utils/interfaces";

export default function BasicTable() {
  const { getLoans } = dataSource();
  const { data: session, status } = useSession({
    required: true,
  });
  //   console.log(session);
  const token = session?.user.api_token;

  const [loans, setLoans] = useState<LoanDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLoans(token);
        setLoans(data);
        console.log(loans);
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
              <b>Principal</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Rate</b>&nbsp;
            </TableCell>

            <TableCell align="right">
              <b>Time</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Amount Due</b>&nbsp;
            </TableCell>

            <TableCell align="right">
              <b>Date Created</b>&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={loan.id}
            >
              <TableCell component="th" scope="row">
                {loan.first_name} {loan.last_name}
              </TableCell>
              <TableCell align="right">{loan.principal} </TableCell>
              <TableCell align="right">{loan.rate} %</TableCell>

              <TableCell align="right">{loan.time} year(s)</TableCell>
              <TableCell align="right">{loan.simple_interest} </TableCell>
              <TableCell align="right">{loan.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
