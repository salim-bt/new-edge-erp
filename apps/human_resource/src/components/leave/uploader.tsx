import { storage } from "@/server/storage";

export async function uploadFile(formData: FormData) {
  "use server";

  const rawFormData = {
    name: formData.get('name'),
    type: formData.get('type'),
    size: formData.get('size'),
    file: formData.get('file'),
  };

  storage.fPutObject(
    "leave-attachments",
    rawFormData.name?.toString() || "",
    rawFormData.file?.toString() || "",
    {
      "Content-Type": rawFormData.type,
      "Content-Length": rawFormData.size,
    },
    (err, etag) => {
      if (err) {
        console.error(err);
      }
      console.log(etag);
    }
  );
}