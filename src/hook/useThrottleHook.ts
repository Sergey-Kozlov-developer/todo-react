import { throttle } from "es-toolkit/function";
import { useCallback, useRef, useState } from "react";

export const useThrottleHook = () => {
    const [inputText, setInputText] = useState("");
    /**
     * создаем throttleInput и в него прокидываем throttle
     * throttle ф-ция задается с промежутком времени, который гарантирует, что
     * за заданное время она вызовется только 1 раз
     */
    const throttleInput = useRef(throttle((value) => setInputText(value), 250));

    const handleChangeInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            throttleInput.current(value);
        },
        []
    );

    return {
        inputText,
        setInputText,
        handleChangeInput,
    };
};
