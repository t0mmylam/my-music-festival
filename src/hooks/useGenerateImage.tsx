import { useState, useRef } from "react";
import { toPng } from "html-to-image";

const useGenerateImage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const ref = useRef(null);

    const generateImage = async () => {
        if (ref.current) {
            const dataUrl = await toPng(ref.current);
            setImageUrl(dataUrl);
        }
    };

    return { ref, generateImage, imageUrl };
};

export default useGenerateImage;
