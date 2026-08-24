import { NextResponse } from "next/server";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EMPREENDIMENTO_ID = "nova-california";

export async function GET() {
  try {
    const rootRef = ref(storage, EMPREENDIMENTO_ID);

    const listRecursive = async (folderRef: any): Promise<any[]> => {
      const res = await listAll(folderRef);

      const subFolderPromises = res.prefixes.map((folder) => listRecursive(folder));
      const subFolderResults = await Promise.all(subFolderPromises);
      const subFiles = subFolderResults.flat();

      const itemPromises = res.items.map(async (itemRef) => {
        const [url, meta] = await Promise.all([
          getDownloadURL(itemRef),
          getMetadata(itemRef),
        ]);

        const sizeMB = (meta.size / (1024 * 1024)).toFixed(1) + " MB";
        const nameLower = itemRef.name.toLowerCase();
        const ext = nameLower.split(".").pop() || "";
        let categoria = meta.customMetadata?.categoria;

        if (!categoria) {
          if (ext === "zip" || ext === "rar") categoria = "pacote_zip";
          else if (ext === "pdf") {
            if (nameLower.includes("tabela")) categoria = "tabela_precos";
            else categoria = "lamina_pdf";
          }
          else if (["mp4", "mov", "webm", "avi", "m4v"].includes(ext)) categoria = "video";
          else if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
            if (nameLower.includes("story")) categoria = "imagem_story";
            else if (nameLower.includes("feed")) categoria = "imagem_feed";
            else categoria = "imagem_avulsa";
          } else {
            categoria = "imagem_avulsa";
          }
        }

        return {
          id: itemRef.fullPath,
          nome: itemRef.name,
          categoria: categoria,
          url: url,
          tamanho: sizeMB,
          dataUpload: meta.customMetadata?.dataUpload || meta.timeCreated.split("T")[0],
        };
      });

      const currentFiles = await Promise.all(itemPromises);

      return [...subFiles, ...currentFiles];
    };

    const items = await listRecursive(rootRef);

    return NextResponse.json(
      { items },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error(">>> ERRO AO LISTAR KIT NOVA CALIFÓRNIA:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar arquivos do Firebase." },
      { status: 500 }
    );
  }
}