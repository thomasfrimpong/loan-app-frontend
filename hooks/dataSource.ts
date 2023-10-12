"use client";
import axios from "axios";
import { Customer, LoanDetails } from "../utils/interfaces";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const dataSource = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();
  const { data: session, status } = useSession();

  // const token = session?.user.api_token;
  // console.log(token);

  const getLoans = async (token: any) => {
    const response = await axios.get(`${process.env.BASE_URL}/get/loans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const loanData = response.data as LoanDetails[];

    return loanData;
  };
  const currentDate = () => {
    // Date object
    const date = new Date();

    const currentDay = String(date.getDate()).padStart(2, "0");

    const currentMonth = String(date.getMonth() + 1).padStart(2, "0");

    const currentYear = date.getFullYear();

    // we will display the date as DD-MM-YYYY

    const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const new_date = new Date().toUTCString().slice(5, 16);

    return new_date;
  };

  return {
    currentDate,
    getLoans,
  };
};
export default dataSource;
