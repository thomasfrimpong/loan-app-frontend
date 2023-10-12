"use client";
import AppBarComponent from "@/app/components/AppBarComponent";
import { useState, useContext, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { TextField, Button, Alert } from "@mui/material";
import { useSession } from "next-auth/react";
import { AuthenticationContext } from "@/app/context/AuthContext";
//import ProtectedRoute from "@/app/context/ProtectedRoute";
import dataEntry from "@/hooks/dataEntry";
import { Customer } from "@/utils/interfaces";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateLoans() {
  const { data: session, status } = useSession({
    required: true,
  });
  //   console.log(session);
  const token = session?.user.api_token;
  const { getCustomers, addLoan } = dataEntry();
  const { error, loading } = useContext(AuthenticationContext);
  const [customerId, setCustomerId] = useState("");

  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [inputs, setInputs] = useState({
    principal: 0,
    rate: 0,
    time: 0,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const list = await getCustomers(token);
      console.log(list);

      setCustomerList(list);
    };
    fetchCustomers();
    console.log(customerList);
  }, [token]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission

    addLoan(
      {
        customer_id: customerId,
        principal: data.principal,
        rate: data.rate,
        time: data.time,
      },
      token
    );
  };

  const handleChangeCustomer = (event: SelectChangeEvent) => {
    console.log(event.target.value);

    setCustomerId(event.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent index="2" />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {error ? (
            <Alert severity="error">
              Account registration failed. Please try again..
            </Alert>
          ) : null}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <h2>Add Loan </h2>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose Customer
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={customerId}
                          label="Choose Customer"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeCustomer}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {customerList.map((customer) => {
                            return (
                              <MenuItem key={customer.id} value={customer.id}>
                                {customer.first_name} {customer.last_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="principal"
                          label="Principal"
                          {...register("principal", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                          type="number"
                        />
                        {errors.principal && (
                          <p style={{ color: "#c40c21" }}>
                            Principal is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="rate"
                          label="rate"
                          {...register("rate", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                          type="number"
                        />
                        {errors.rate && (
                          <p style={{ color: "#c40c21" }}>Rate is required</p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="time"
                          label="Time"
                          {...register("time", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                          type="number"
                        />
                        {errors.time && (
                          <p style={{ color: "#c40c21" }}>Time is required</p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ mt: 3, width: "320px", mb: 6, mr: 5 }}
                          disabled={loading}
                        >
                          {loading ? "Saving...." : "Submit"}
                        </Button>
                      </FormControl>
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
