import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      console.error(">>> ERRO: BLOB_READ_WRITE_TOKEN não configurado.");
      return NextResponse.json({ items: [], error: "Token do Blob ausente." }, { status: 500 });
    }

    // Listar todos os arquivos do Vercel Blob
    const { blobs } = await list({ token });

    const items = blobs.map((blob) => {
      const parts = blob.pathname.split("/");
      
      // Tenta extrair a estrutura: kit / dataUpload / categoria / nome
      let dataUpload = "";
      let categoria = "imagem_avulsa";
      let nome = blob.pathname;

      if (parts.length >= 4) {
        dataUpload = parts[1] || "";
        categoria = parts[2] || "imagem_avulsa";
        nome = parts[3] || blob.pathname;
      } else {
        nome = parts[parts.length - 1] || blob.pathname;
      }

      // Formatar tamanho em MB
      const tamanhoMB = (blob.size / (1024 * 1024)).toFixed(1);

      return {
        id: blob.url,
        url: blob.url,
        nome: nome,
        categoria: categoria,
        dataUpload: dataUpload || new Date(blob.uploadedAt).toISOString().split("T")[0],
        tamanho: `${tamanhoMB} MB`,
        uploadedAt: blob.uploadedAt,
      };
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    console.error(">>> Erro ao listar arquivos do Vercel Blob:", error);
    return NextResponse.json({ items: [], error: error?.message || "Erro ao buscar do Blob." }, { status: 500 });
  }
}