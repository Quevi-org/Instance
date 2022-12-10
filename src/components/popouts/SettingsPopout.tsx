import { addServer, removeServer, serverList } from "api/serverManager"
import TextBox from "components/TextBox"
import { useState, useReducer } from "react"
import { MdDelete } from "react-icons/md"

export default () => {
    return <>
        <ServerTab />
    </>
}

export const ServerTab = () => {
    const [serverInput, setServerInput] = useState("http://")
    const [isAdding, setIsAdding] = useState(false)
    const [, forceUpdate] = useReducer(e => e, true)

    return <>
        {serverList.map(server => <div>
            <span>{server}</span>
            {server !== import.meta.env.VITE_DEFAULT_URL && <MdDelete onClick={() => {
                removeServer(server)
                forceUpdate()
            }} />}
        </div>)}
        <TextBox text={serverInput} onChange={setServerInput} />
        <button onClick={async () => {
            if(serverList.includes(serverInput)) return
            setIsAdding(true)
            addServer(serverInput).catch(() => {
                alert(`Failed to add server ${serverInput}`)
            }).finally(() => {
                setServerInput("http://")
                setIsAdding(false)
                forceUpdate()
            })
        }} disabled={isAdding}>Add</button>
    </>
}