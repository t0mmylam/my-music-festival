import { useRef } from "react";
import { toPng } from "html-to-image";

const useGenerateImage = () => {
    const ref = useRef<HTMLDivElement>(null);

    const generateImage = async () => {
        if (ref.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(ref.current, { cacheBust: true });
            const link = document.createElement("a");
            link.download = "top-artists.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    return { ref, generateImage };
};

export default useGenerateImage;
