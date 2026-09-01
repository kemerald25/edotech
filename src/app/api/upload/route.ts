import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as any) || "events";

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    // Upload to Cloudinary CDN
    const result = await uploadToCloudinary(file as any, folder);

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      publicId: result.publicId,
      format: result.format,
      message: "Image uploaded to Cloudinary CDN successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 },
    );
  }
}
