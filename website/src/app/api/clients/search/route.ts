import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BACKEND_SERVER_URL,
  });
  const searchParams = request.nextUrl.searchParams;
  let clientId = searchParams.get("clientId");

  let res: AxiosResponse;
  try {
    res = await axiosInstance.get(`/api/clients/search?clientId=${clientId}`);
  } catch (error) {
    const err = error as AxiosError;
    return NextResponse.json(err.response?.data, {
      status: err.response?.status,
    });
  }
  return NextResponse.json(res.data, { status: res.status });
}
