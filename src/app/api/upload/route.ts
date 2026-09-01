import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folderValue = formData.get("folder");
    const folder = (folderValue === "events" || folderValue === "blog" || folderValue === "members" || folderValue === "partners")
      ? folderValue
      : "events";

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    // Upload to Cloudinary CDN
    const result = await uploadToCloudinary(file as File, folder);

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      publicId: result.publicId,
      format: result.format,
      message: "Image uploaded to Cloudinary CDN successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to upload image to Cloudinary";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
