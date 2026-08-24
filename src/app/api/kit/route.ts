import { NextResponse } from "next/server";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const dynamic = "force-dynamic";

const EMPREENDIMENTO_ID = "nova-california";

export async function GET() {
  try {
    const rootRef = ref(storage, EMPREENDIMENTO_ID);

    const listRecursive = async (folderRef: any): Promise<any[]> => {
      const res = await listAll(folderRef);

      const subFolderPromises = res.prefixes.map((folder) => listRecursive(folder));
      const subFolderResults = await Promise.all(subFolderPromises);
      const subFiles = subFolderResults.flat();

      // Busca APENAS a URL do arquivo. Categoria e Data são lidos direto da estrutura de pastas!
      const itemPromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);

        // Estrutura do caminho: nova-california/YYYY-MM-DD/categoria/nome.ext
        const parts = itemRef.fullPath.split("/");
        const dataUpload = parts.length >= 3 ? parts[1] : new Date().toISOString().split("T")[0];
        const categoriaPasta = parts.length >= 4 ? parts[2] : "imagem_avulsa";

        const nameLower = itemRef.name.toLowerCase();
        const ext = nameLower.split(".").pop() || "";
        let categoria = categoriaPasta;

        if (ext === "zip" || ext === "rar") categoria = "pacote_zip";
        else if (ext === "pdf") {
          if (nameLower.includes("tabela")) categoria = "tabela_precos";
          else categoria = "lamina_pdf";
        } else if (["mp4", "mov", "webm", "avi", "m4v"].includes(ext)) {
          categoria = "video";
        }

        return {
          id: itemRef.fullPath,
          nome: itemRef.name,
          categoria,
          url,
          tamanho: "PDF / Mídia",
          dataUpload,
        };
      });

      const currentFiles = await Promise.all(itemPromises);
      return [...subFiles, ...currentFiles];
    };

    const items = await listRecursive(rootRef);

    // Cache inteligente de 10 segundos: instantâneo para o corretor e atualiza quase em tempo real
    return NextResponse.json(
      { items },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (error: any) {
    console.error(">>> ERRO AO LISTAR KIT NOVA CALIFÓRNIA:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar arquivos." },
      { status: 500 }
    );
  }
}