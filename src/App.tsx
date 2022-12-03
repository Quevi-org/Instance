import { useEffect, useState } from "react"
import {useQuery} from "react-query"
import { getRandomQuestion } from "./api/fetchServer"
import QuestionView from "./components/QuestionView"
import _ from "lodash"

function App() {
    const query = useQuery("question", getRandomQuestion, {refetchOnWindowFocus: false})

    const [answered, setAnswered] = useState<boolean>(false)
    const [options, setOptions] = useState<{[key: string]: boolean}>({})

    useEffect(() => {
        if(!query.isLoading) {
            let opts: {[key: string]: boolean} = {}
            for (const identifier in query.data!.answers) {
                opts[identifier] = false
            }
            setOptions(opts)
        }
    }, [query.isLoading])

    return <>
        <div>
            {!(query.isLoading || query.isError) && <QuestionView
                question={query.data!}
                showItems={answered}
                options={options}
                onQuestionClick={(identifier) => {
                    if(answered) return
                    let newOpts = {...options}
                    newOpts[identifier] = !newOpts[identifier]
                    setOptions(newOpts)
                }}
                button={answered ? "Next" : (() => {
                    let obj = Object.values(options)
                    if(obj.every(e => e === false)) return "Skip"
                    else {
                        const objTrueLength = obj.filter(e => e).length
                        return objTrueLength > 1 ? `Check (${objTrueLength})` : "Check"
                    }
                })()}
                onButtonClick={() => {
                    if(answered) {
                        query.refetch()
                        setOptions({})
                        setAnswered(false)
                    } else {
                        setAnswered(true)
                    }
                }}
            />}
            {query.isLoading && <span>Loading</span>}
            {query.isError && <span>Error</span>}
        </div>
    </>
}

// const Manager = ({question}: {question: Question}) => {
//     const query = getQuery<Question>("question")
//     const [answered, setAnswered] = useState<boolean>(false)
//     const [options, setOptions] = useState<{[key: string]: boolean}>({})

//     useEffect(() => {
//         let opts: {[key: string]: boolean} = {}
//         for (const identifier in question.answers) {
//             opts[identifier] = false
//         }
//         setOptions(opts)
//     }, [])

//     return <>
//         <div>
//             {answered ? <button onClick={() => {query.refetch(); setAnswered(false)}}>Next</button> : <button onClick={() => setAnswered(true)}>Show</button>}

//             {!(query.isFetching || query.isError) && <QuestionView
//                 question={query.data!}
//                 showItems={answered}
//                 options={options}
//                 onQuestionClick={(identifier) => {
//                     if(answered) return
//                     let newOpts = {...options}
//                     newOpts[identifier] = !newOpts[identifier]
//                     setOptions(newOpts)
//                 }}/>}
//             {query.isFetching && <span>Loading</span>}
//             {query.isError && <span>Error</span>}
//         </div>
//     </>
// }

export default App
