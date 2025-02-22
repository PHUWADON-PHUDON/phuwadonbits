import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req:NextRequest) {
    try {
        const filePath = path.join(process.cwd(), "app", "data", "splittext.txt");
        const fileContent = fs.readFileSync(filePath, "utf-8");
    
        return NextResponse.json({ content: fileContent });
    }
    catch (error) {
      return NextResponse.error();
    }
}