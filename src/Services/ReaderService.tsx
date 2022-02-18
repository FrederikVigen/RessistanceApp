import { createContext, useContext } from "react";

export interface IReaderService {
    readText(str: string): void
}

export const ReaderserviceContext = createContext<IReaderService | undefined>(undefined);

const ReaderService = ({children}: any) => {
    
    const readerService : IReaderService = {
        readText: (str) => {
            console.log(str)
        }
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