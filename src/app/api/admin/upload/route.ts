import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  let body: HandleUploadBody;

  try {
    body = (await request.json()) as HandleUploadBody;
  } catch (err) {
    console.error(">>> ERRO AO LER BODY DA REQUISIÇÃO:", err);
    return NextResponse.json({ error: "Body inválido na requisição." }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Exemplo: pathname contém o nome do arquivo que está sendo enviado
        console.log(">>> GERANDO TOKEN PARA UPLOAD DO ARQUIVO:", pathname);

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "application/pdf",
            "application/zip",
            "application/x-zip",
            "application/x-zip-compressed",
            "application/octet-stream", // Garante suporte a arquivos ZIP/MP4 com MIME genérico
            "video/mp4",
            "video/quicktime", // Suporte a vídeos enviados de iOS/Safari (.mov/mp4)
          ],
          tokenPayload: JSON.stringify({
            uploadedAt: new Date().toISOString(),
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log(">>> UPLOAD DIRETO CONCLUÍDO NO VERCEL BLOB:", blob.url, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error(">>> ERRO NO PROCESSAMENTO DO VERCEL BLOB:", error);
    return NextResponse.json(
      { error: error?.message || "Erro no processamento do token de upload." },
      { status: 400 }
    );
  }
}