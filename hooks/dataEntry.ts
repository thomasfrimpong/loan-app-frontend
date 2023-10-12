"use client";
import axios from "axios";
import { Admin, Customer, Loan } from "../utils/interfaces";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const dataEntry = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();

  const { data: session, status } = useSession();
  const token = session?.user.api_token;

  const addCustomer = async ({
    first_name,
    last_name,
    phone_number,
    address,
    email,
    marital_status,

    id_card,
  }: Customer) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/register/customer`,

        {
          first_name,
          last_name,
          phone_number,
          address,
          email,
          marital_status,

          id_card,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });

      console.log(response);
      router.push("/customers");
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      console.log(error);
    }
  };

  const addLoan = async (
    { customer_id, principal, rate, time }: Loan,
    token: any
  ) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/add/loan`,
        {
          customer_id,
          principal,
          rate,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      router.push("/loans");

      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      console.log(error);
    }
  };

  const getCustomers = async (token: any) => {
    const response = await axios.get(`${process.env.BASE_URL}/customer/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const customersData = response.data as Customer[];

    return customersData;
  };

  return {
    addCustomer,
    addLoan,
    getCustomers,
  };
};

export default dataEntry;
