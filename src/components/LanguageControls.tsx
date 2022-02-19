import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useLanguageService } from '../Services/LanguageService'

const LanguageControls = () => {
    const languageService = useLanguageService()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, v: string) => {
        languageService.setLanguage(v)
    }

    return (
        <RadioGroup
            value={languageService.currentLanguage}
            onChange={handleChange}
        >
            {Array.from(languageService.languages).map(([k,v], i) => 
                <FormControlLabel key={i} value={k} control={<Radio />} label={v} />
            )}
        </RadioGroup>
    )
}

export default LanguageControls