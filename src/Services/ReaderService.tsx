import { createContext, useContext, useState } from "react";

export interface IReaderService {
    readText(strs: string[]): void
    setRate(rate: number): void
    rate: number
    setLineBreak(lineBreak: number): void
    lineBreak: number
    defaultLineBreak: number
    defaultRate: number
}

export const ReaderserviceContext = createContext<IReaderService | undefined>(undefined);

const ReaderService = ({children}: any) => {
    const synth = window.speechSynthesis
    const defaultRate = 1
    const defaultLineBreak = 1
    const [rate, setRate] = useState(defaultRate)
    const [lineBreak, setLineBreak] = useState(defaultLineBreak)

    const readerService : IReaderService = {
        readText: (strs) => {
            for(var str in strs) {
                var utterance = new SpeechSynthesisUtterance(str)
                synth.speak(utterance)
            }
        },
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
    if(context === undefined) {
        throw new Error("IReaderService was not defined or child is not a child of the ReaderService")
    }
    return context;
}