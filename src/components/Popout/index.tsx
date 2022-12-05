import React from "react"
import Popup from "reactjs-popup"
import styles from "./index.module.scss"

interface Props {
    position?: ["top" | "center" | "bottom", "left" |"center" | "right"]
    children: React.ReactNode
    popout: React.ReactNode
}

export default ({popout, children, position}: Props) => <Popup
    trigger={children as JSX.Element}
    position={position?.join(" ") as any}
    arrowStyle={{color: "transparent"}}
>
    <div className={styles.popout}>
        {popout}
    </div>
</Popup>