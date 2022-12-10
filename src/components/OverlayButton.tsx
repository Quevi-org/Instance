import Popout from "./Popout"
import { MdSettings } from "react-icons/md"
import SettingsPopout from "./popouts/SettingsPopout"

export default () => {
    return <Popout popout={<SettingsPopout />} position={["top", "right"]}>
        <div style={{position: "fixed", bottom: "16px", right: "16px", cursor: "pointer"}}>
            <MdSettings size={28}/>
        </div>
    </Popout>
}