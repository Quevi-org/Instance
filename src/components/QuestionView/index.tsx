import ReactMarkdown from "react-markdown"
import Options from "./Answer"
import styles from "./index.module.scss"
import remarkGfm from "remark-gfm"
import normalizeUrl from "normalize-url"

interface Props {
    question: Question
    showItems?: boolean
    options: {[key: string]: boolean}
    onQuestionClick?: (identifier: string) => void
    button?: React.ReactNode
    onButtonClick?: () => void,
    server?: string
}

export default ({question, showItems = false, options, onQuestionClick, button, onButtonClick, server}: Props) => {
    return <>
        <div className={styles["wrapper"]}>
            <div className={styles["description"]}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.description}</ReactMarkdown>
                <span className={styles["path"]}>From: {server != null ? normalizeUrl(`${server}/${question.path}`) : question.path}</span>
            </div>
            {button && <button onClick={onButtonClick}>{button}</button>}
        </div>

        {Object.entries(question.answers).map(([identifier, answer]) => <Options {...{identifier, answer, showItems}}
            checked={options[identifier]}
            onClick={() => onQuestionClick?.(identifier)}
        />)}
    </>
}