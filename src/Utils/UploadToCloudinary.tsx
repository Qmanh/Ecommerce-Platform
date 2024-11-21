export const UploadToCloudinary = async(pics:any)=>{
    const cloud_name = "dkltq8wsj"
    const upload_preset="Ecommerce"

    if(pics){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch("https://api.cloudinary.com/v1_1/dkltq8wsj/upload",{
            method:"POST",
            body:data
        })

        const fileData = await res.json()
        return fileData.url;
    }
    else{
        console.log("error : pics not found");
    }
}