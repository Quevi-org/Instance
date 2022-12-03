import { useState } from "react"
import joinClasses from "../../utils/joinClasses"
import style from "./Answer.module.scss"

export interface Props {
    answer: Answer
    identifier: string
    showItems?: boolean
    checked: boolean
    onClick: () => void
}

export default ({answer, identifier, showItems = false, checked, onClick}: Props) => {
    // const [checked, setChecked] = useState(false)

    return <div className={style["answer"]} {...{onClick}}>
        {!showItems ? <Checkbox value={checked} letter={identifier}/> : <ResolvedCheckbox value={answer.value === true ? true : (checked ? answer.value : null)} letter={identifier}/>}
        <span>{answer.name}</span>
    </div>
}

interface CheckboxProps {
    value?: boolean
    letter?: string
    onClick?: () => void
}

export const Checkbox = ({value = false, onClick, letter}: CheckboxProps) => {
    return <div className={joinClasses(style["checkbox"], value ? style["checked"] : "")} {...{onClick}}>
        {letter}
    </div>
}

type ResolvedCheckboxProps = Modify<CheckboxProps, {
    value: boolean | null
}>

export const ResolvedCheckbox = ({value = false, onClick, letter}: ResolvedCheckboxProps) => {
    let resolvedExtraClass =
        value === null
        ? ""
        : (value ? style["correct"] : style["false"])

    return <div className={joinClasses(style["checkbox"], resolvedExtraClass)} {...{onClick}}>
        {letter}
    </div>
}