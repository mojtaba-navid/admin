import { ButtonProps } from '@mui/material'
import { LoadingButton } from '@mui/lab'
interface other {
    loading?: boolean;
}
interface PropsType extends ButtonProps, other { }

export default function muiButton(props: PropsType) {
    const { children } = props
    return (
        <LoadingButton variant='text'   {...props}>
            {children}
        </LoadingButton>
    )
}
