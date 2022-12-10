import { useState } from "react";

interface Props {
    text?: string;
    onChange?: (text: string) => void;
}

export default ({text: propText, onChange}: Props) => {
    const [text, setText] = useState(propText ?? "")

    return <input type="text"
        onChange={(e) => {
            if(propText == null) setText(e.target.value)
            onChange?.(e.target.value)
        }}
        value={propText || text}
    />
}