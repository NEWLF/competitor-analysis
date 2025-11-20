// useEllipsisTooltip.ts
import { useRef, useState, useEffect } from "react";

export const useEllipsisTooltip = (value) => {
    const ref = useRef(null);
    const [isEllipsis, setIsEllipsis] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const checkEllipsis = () => {
            const isOverflow =
                el.scrollHeight > el.clientHeight + 1; // 2줄 제한을 넘는지 검사
            setIsEllipsis(isOverflow);
        };

        checkEllipsis();
        window.addEventListener("resize", checkEllipsis);

        return () => window.removeEventListener("resize", checkEllipsis);
    }, [value]);

    return { ref, isEllipsis };
};
