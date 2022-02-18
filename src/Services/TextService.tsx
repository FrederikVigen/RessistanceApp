import { createContext, useContext, useState } from "react";
import scripts from "../assets/scripts/scripts.json"

export interface ITextService {
    addExpansion(key: string): void
    removeExpansion(keyToRemove: string): void
    currentText: string[]
    availableExpansions: string[]
}

export const TextServiceContext = createContext<ITextService | undefined>(undefined);

const TextService = ({children}: any) => {
    const start = "start"
    const end = "end"
    const [selectedExpansions, setSelectedExpansions] = useState<string[]>([])
    const scriptsMap = new Map(Object.entries(scripts))

    const readerService : ITextService = {
        availableExpansions: Object.keys(scripts).slice(1,-1),
        currentText: [start, ...selectedExpansions, end].map(k => scriptsMap.get(k) ?? "").filter(v => v !== "").flat(),
        addExpansion: (key: string) => setSelectedExpansions([...selectedExpansions, key]),
        removeExpansion: (keyToRemove: string) => {
            setSelectedExpansions(selectedExpansions.filter(k => k !== keyToRemove))
        }
    }
  
    return (
    <TextServiceContext.Provider value={readerService}>
        {children}
    </TextServiceContext.Provider>
  )
}

export default TextService

export const useTextService = () => {
    const context = useContext<ITextService | undefined>(TextServiceContext);
    if(context === undefined) {
        throw new Error("ITextService was not defined or child is not a child of the ReaderService")
    }
    return context;
}