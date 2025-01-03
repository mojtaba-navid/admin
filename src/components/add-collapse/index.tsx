import { Collapse } from '@mui/material'
import { ReactNode, useState } from 'react'
import { Icon } from '@iconify/react'
interface propsType {
    children: ReactNode,
    title: string
}
export default function AddCollapse(props: propsType) {
    const [CollapseStatus, setCollapseStatus] = useState<boolean>(true)
    return (
        <>
            <div className='bg-blue-200 p-3  rounded-t-lg  cursor-pointer  flex  justify-between' onClick={() => setCollapseStatus(value => !value)} >
                <span>{props.title}</span>
                {!CollapseStatus && <Icon icon="ic:baseline-plus" width="24" height="24" />}
                {CollapseStatus && <Icon icon="iconamoon:sign-minus" width="24" height="24" />}
            </div>
            <Collapse in={CollapseStatus}>
                {props.children}
            </Collapse>

        </>
    )
}
