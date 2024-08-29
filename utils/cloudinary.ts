export const uploadImageToCloudinary = async (imageUrl: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append('upload_preset', 'unsigned_upload_preset');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };
