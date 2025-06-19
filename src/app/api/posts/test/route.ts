import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/posts.json");
    const stats = await fs.stat(filePath);
    
    return NextResponse.json({
      exists: true,
      path: filePath,
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
    });
  } catch (error) {
    return NextResponse.json({
      exists: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      cwd: process.cwd(),
    });
  }
} 