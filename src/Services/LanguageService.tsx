import { createContext, useContext, useEffect, useState } from "react";
import languagesJson from  '../assets/languages.json'

export interface ILanguageService {
    languages: Map<string,string>
    currentLanguage: string
    setLanguage(code: string): void
}

export const LanguageServiceContext = createContext<ILanguageService | undefined>(undefined);

const LanguageService = ({children}: any) => {
    const languages = new Map(Object.entries(languagesJson))
    const [currentLanguage, setCurrentLanguage] = useState("en-US")

    useEffect(() => {
        const defaultVoice = window.speechSynthesis.getVoices().filter(v => v.default)[0]
        const defaultLang = !languages.has(defaultVoice.lang) ? "en-US" : defaultVoice.lang
        setCurrentLanguage(defaultLang)
    }, [window.speechSynthesis])
    
    const languageService : ILanguageService = {
        languages: languages,
        setLanguage: setCurrentLanguage,
        currentLanguage: currentLanguage,
    }
  
    return (
    <LanguageServiceContext.Provider value={languageService}>
        {children}
    </LanguageServiceContext.Provider>
  )
}

export default LanguageService

export const useLanguageService = () => {
    const context = useContext<ILanguageService | undefined>(LanguageServiceContext);
    if(context === undefined) {
        throw new Error("ILanguageService was not defined or child is not a child of the LanguageService")
    }
    return context;
}