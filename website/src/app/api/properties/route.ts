import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BACKEND_SERVER_URL,
    headers: { Authorization: request.headers.get("Authorization") },
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.post(`/api/properties/`, data);
  } catch (error) {
    const err = error as AxiosError;
    return NextResponse.json(err.response?.data, {
      status: err.response?.status,
    });
  }
  return NextResponse.json(res.data, { status: res.status });
}
