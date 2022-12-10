import { addServer, serverList } from "api/serverManager"
import TextBox from "components/TextBox"
import { useState, useReducer } from "react"

export default () => {
    return <>
        <ServerTab />
    </>
}

export const ServerTab = () => {
    const [serverInput, setServerInput] = useState("http://")
    const [, forceUpdate] = useReducer(e => e, true)

    return <>
        {serverList.map(server => <div>
            <span>{server}</span>
        </div>)}
        <TextBox text={serverInput} onChange={setServerInput} />
        <button onClick={() => {
            addServer(serverInput)
            setServerInput("http://")
            forceUpdate()
        }}>Add</button>
    </>
}