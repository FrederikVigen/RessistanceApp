import { createContext, useContext, useEffect, useState } from "react";

export interface IReaderService {
    readText(strs: string[]): void
    pauseSpeech(): void
    resumeSpeech(): void
    stopSpeech(): void
    isSpeaking: boolean
    isPaused: boolean
    setRate(rate: number): void
    rate: number
    setLineBreak(lineBreak: number): void
    lineBreak: number
    defaultLineBreak: number
    defaultRate: number
}

export const ReaderserviceContext = createContext<IReaderService | undefined>(undefined);

const ReaderService = ({ children }: any) => {
    const synth = window.speechSynthesis
    const defaultRate = 1
    const defaultLineBreak = 1
    const [rate, setRate] = useState(defaultRate)
    const [lineBreak, setLineBreak] = useState(defaultLineBreak)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isPaused, setisPaused] = useState(false)
    const [utterances, setUtterances] = useState<SpeechSynthesisUtterance[]>([])

    const readerService: IReaderService = {
        readText: (strs) => {
            const utterances = strs.map(str => new SpeechSynthesisUtterance(str))
            setUtterances(utterances)

            //Bind utterrances together to make them wait the linebreak time after each one another
            const lastUt = utterances.reduce((prevUt: undefined | SpeechSynthesisUtterance, curUt: SpeechSynthesisUtterance, i) => {
                if (prevUt !== undefined) {
                    prevUt.onend = () => {
                        console.log(`${i + 1} out of ${utterances.length} is playing`)
                        setTimeout(() => {
                            synth.speak(curUt)
                        }, defaultLineBreak * 1000)
                    }
                }
                return curUt
            }, undefined)

            //Bind to last utterrance to change state to stop playing
            if(lastUt !== undefined) {
                lastUt.onend = () => {
                    console.log("Last utterrance played")
                    setIsSpeaking(false)
                }
            }

            console.log(strs)
            synth.speak(utterances[0])
            setIsSpeaking(true)
            console.log("First utterrance started")
        },
        pauseSpeech: () => {
            console.log("Speech was paused")
            synth.pause()
            setisPaused(true)
            setIsSpeaking(false)
        },
        resumeSpeech: () => {
            console.log("Speech was resumed")
            synth.resume()
            setisPaused(false)
            setIsSpeaking(true)
        },
        stopSpeech: () => {
            console.log("Speech was stopped")
            utterances.forEach(ut => ut.onend = () => {})
            synth.cancel()
            setisPaused(false)
            setIsSpeaking(false)
        },
        isSpeaking: isSpeaking,
        isPaused: isPaused,
        rate: rate,
        setRate: setRate,
        lineBreak: lineBreak,
        setLineBreak: setLineBreak,
        defaultRate: defaultRate,
        defaultLineBreak: defaultLineBreak
    }

    return (
        <ReaderserviceContext.Provider value={readerService}>
            {children}
        </ReaderserviceContext.Provider>
    )
}

export default ReaderService

export const useReaderService = () => {
    const context = useContext<IReaderService | undefined>(ReaderserviceContext);
    if (context === undefined) {
        throw new Error("IReaderService was not defined or child is not a child of the ReaderService")
    }
    return context;
}