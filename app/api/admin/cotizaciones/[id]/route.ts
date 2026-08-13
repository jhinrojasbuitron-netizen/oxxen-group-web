import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = req.cookies.get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { atendido } = await req.json();

  const cotizacion = await prisma.cotizacion.update({
    where: { id: Number(params.id) },
    data: { atendido },
  });

  return NextResponse.json(cotizacion);
}