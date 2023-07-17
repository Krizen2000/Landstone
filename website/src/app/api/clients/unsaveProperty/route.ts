import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const rawToken = request.headers.get("Authorization");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BACKEND_SERVER_URL,
    headers: {
      Authorization: rawToken,
    },
  });
  let res: AxiosResponse;
  try {
    res = await axiosInstance.put("/api/clients/unsaveProperty", data);
  } catch (error) {
    const err = error as AxiosError;
    return NextResponse.json(err.response?.data, {
      status: err.response?.status,
    });
  }
  return NextResponse.json(res.data, { status: res.status });
}
