import Popout from "reactjs-popup"

interface Props {
    children: React.ReactNode
    modal: React.ReactNode
}

export default ({modal, children}: Props) => <Popout
    trigger={<>{children}</>}
    modal
>{modal}</Popout>