import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xidzzfbsjxsswbwjsukq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZHp6ZmJzanhzc3did2pzdWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NDQ0MTEsImV4cCI6MjA4MDMyMDQxMX0.t7qYlHp6jnVYjAMlN7Rc6ZufUKLLOpSNTIeWwtLTYiM"
);

export default async function mediaUpload(file) {
  if (!file) throw new Error("File is null or undefined");

  const fileName = `${Date.now()}-${file.name}`;

  // Upload file
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }

  // Get public URL
  const { data: publicData, error: urlError } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  if (urlError) {
    console.error("Get public URL failed:", urlError);
    throw urlError;
  }

  return publicData.publicUrl;
}
