import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!url) {
      return NextResponse.json({ error: "URL do arquivo é necessária para exclusão." }, { status: 400 });
    }

    // 1. Deletar arquivo físico do Vercel Blob
    await del(url, { token });
    console.log(">>> Arquivo deletado com sucesso do Vercel Blob:", url);

    // 2. Deletar registro correspondente no Supabase (se existir)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: dbError } = await supabase.from("kit_items").delete().eq("url", url);

      if (dbError) {
        console.warn(">>> Aviso: Não foi possível deletar a referência do banco no Supabase:", dbError.message);
      } else {
        console.log(">>> Registro removido com sucesso do Supabase.");
      }
    }

    return NextResponse.json({ success: true, message: "Arquivo excluído com sucesso." }, { status: 200 });
  } catch (error: any) {
    console.error(">>> Erro ao deletar arquivo:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao deletar arquivo." },
      { status: 500 }
    );
  }
}