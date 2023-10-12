import React from "react";

export interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  marital_status: string;
  address: string;
  phone_number: string;
  id_card: string;
  email: string;
  created_at?: string;
}

export interface Admin {
  id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at?: string;
}

export interface Loan {
  id?: number;
  customer_id: string;
  principal: number;
  rate: number;
  time: number;
}
export interface LoanDetails {
  id: number;
  first_name: string;
  last_name: string;
  simple_interest: number;
  rate: number;
  time: number;
  principal: number;
  created_at?: string;
}
