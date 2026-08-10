import { createClient } from "@supabase/supabase-js";

// Inicialize o cliente do Supabase no frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função auxiliar para formatar o tamanho do arquivo
function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 MB";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Função de Upload em Lote ajustada para Upload Direto no Supabase Storage
async function handleEnviarArquivos(files: File[], dataVersao: string) {
  for (const file of files) {
    try {
      // 1. Gerar nome único para evitar sobrescrever arquivos existentes
      const fileExt = file.name.split(".").pop();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, "_");
      const filePath = `uploads/${Date.now()}_${cleanFileName}.${fileExt}`;

      // 2. Upload direto do Browser -> Supabase Storage (sem limite de 4.5MB da Vercel)
      const { data: storageData, error: uploadError } = await supabase.storage
        .from("kit-corretor")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Erro no Supabase Storage: ${uploadError.message}`);
      }

      // 3. Obter a URL pública do arquivo
      const { data: publicUrlData } = supabase.storage
        .from("kit-corretor")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // 4. Identificar Categoria pelo Tipo/Extensão
      let categoria = "imagem_avulsa";
      if (fileExt?.toLowerCase() === "zip") categoria = "pacote_zip";
      if (fileExt?.toLowerCase() === "pdf") categoria = "lamina_pdf";
      if (fileExt?.toLowerCase() === "mp4") categoria = "video";

      // 5. Registrar apenas os metadados no Banco de Dados
      const res = await fetch("/api/kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: file.name,
          categoria,
          url: publicUrl,
          tamanho: formatBytes(file.size),
          dataUpload: dataVersao,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao salvar no banco");
      }

    } catch (err: any) {
      alert(`Falha no upload de ${file.name}: ${err.message}`);
    }
  }
}