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

// from https://stackoverflow.com/a/73369825
declare type StringLength<
  S extends string,
  Acc extends 0[] = []
> = S extends `${string}${infer $Rest}`
  ? LengthOfString<$Rest, [...Acc, 0]>
  : Acc["length"];