import ReactMarkdown from "react-markdown"
import Options from "./Answer"
import styles from "./index.module.scss"
import remarkGfm from "remark-gfm"

interface Props {
    question: Question
    showItems?: boolean
    options: {[key: string]: boolean}
    onQuestionClick?: (identifier: string) => void
    button?: React.ReactNode
    onButtonClick?: () => void
}

export default ({question, showItems = false, options, onQuestionClick, button, onButtonClick}: Props) => {
    return <>
        <div className={styles["wrapper"]}>
            <div className={styles["description"]}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.description}</ReactMarkdown>
                <span className={styles["path"]}>From: {question.path}</span>
            </div>
            {button && <button onClick={onButtonClick}>{button}</button>}
        </div>

        {Object.entries(question.answers).map(([identifier, answer]) => <Options {...{identifier, answer, showItems}}
            checked={options[identifier]}
            onClick={() => onQuestionClick?.(identifier)}
        />)}
    </>
}