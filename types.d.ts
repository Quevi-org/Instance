declare interface Directory {
    name: string
    path: string
    questions: {[questionName: string]: Question}
    directories: Directory[]
}

declare interface Question {
    path?: string
    description: string
    answers: {
        [answerIdentifier: string]: Answer
    }
}

declare interface Answer {
    name: string
    value: boolean
}

type Modify<T, R> = Omit<T, keyof R> & R;