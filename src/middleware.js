import { withClerkMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
    return NextResponse.next();
});