import { useRef, useState, useEffect } from "react";

export const useEllipsisTooltip = (value?: string) => {
    const ref = useRef<HTMLElement | null>(null);
    const [isEllipsis, setIsEllipsis] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const checkEllipsis = () => {
            if (!el) return;

            const isOverflow =
                el.scrollWidth > el.clientWidth + 1 ||   // 1줄: 가로로 잘림
                el.scrollHeight > el.clientHeight + 1;   // N줄: 세로로 잘림

            setIsEllipsis(isOverflow);
        };

        checkEllipsis();

        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => checkEllipsis());
            observer.observe(el);
            return () => observer.disconnect();
        }

        window.addEventListener("resize", checkEllipsis);
        return () => window.removeEventListener("resize", checkEllipsis);
    }, [value]);

    return { ref, isEllipsis };
};
