import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BACKEND_SERVER_URL,
  });
  const searchParams = request.nextUrl.searchParams;
  let agentId: string | null = null;
  let propertyId: string | null = null;
  agentId = searchParams.get("agentId");
  propertyId = searchParams.get("propertyId");

  let res: AxiosResponse;
  try {
    if (agentId)
      res = await axiosInstance.get(
        `/api/properties/search?agentId=${String(agentId)}`
      );
    else {
      res = await axiosInstance.get(
        `/api/properties/search?propertyId=${propertyId}`
      );
    }
  } catch (error) {
    const err = error as AxiosError;
    return NextResponse.json(err.response?.data, {
      status: err.response?.status,
    });
  }
  return NextResponse.json(res.data, { status: res.status });
}
