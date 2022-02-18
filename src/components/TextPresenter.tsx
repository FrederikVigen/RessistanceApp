import { Paper, Typography } from '@mui/material'
import { useTextService } from '../Services/TextService'

const TextPresenter = () => {
    const textService = useTextService()
    return (
        <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">Read the following lines:</Typography>
            {textService.currentText.map((t, i) =>
                <Typography key={i} variant="body1">{t}</Typography>
            )}
        </Paper>
    )
}

export default TextPresenter