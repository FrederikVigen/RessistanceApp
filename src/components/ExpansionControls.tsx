import { Checkbox, FormControlLabel, Stack } from '@mui/material'
import React from 'react'
import scripts from '../assets/scripts/scripts.json'
import jsConvert from 'js-convert-case'
import { useTextService } from '../Services/TextService'

const ExpansionControls = () => {

    const textService = useTextService();

    const handleChange = (e : React.SyntheticEvent<Element, Event>, checked: boolean) => {
        const func = checked ? textService.addExpansion : textService.removeExpansion
        const elem = e.target as HTMLInputElement
        func(elem.value)
    }

    return (
        <Stack>
            {Object.keys(scripts).slice(1, -1).map((k, i) =>
                <FormControlLabel
                    value={k}
                    key={i}
                    control={<Checkbox />}
                    label={jsConvert.toHeaderCase(k)}
                    onChange={handleChange}
            />
            )}
        </Stack>
    )
}

export default ExpansionControls