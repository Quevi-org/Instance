import Popout from "./Popout"
import { MdSettings } from "react-icons/md"

export default () => {
    return <Popout popout={<div>meow</div>} position={["top", "right"]}>
        <div style={{position: "fixed", bottom: "16px", right: "16px", cursor: "pointer"}}>
            <MdSettings size={28}/>
        </div>
    </Popout>
}