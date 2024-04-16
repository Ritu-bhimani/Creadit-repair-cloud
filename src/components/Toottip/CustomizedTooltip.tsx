import { createMuiTheme, css, Tooltip } from "@mui/material"
import { FC } from "react"

interface ToolTipProp {
    children?: any;
    title: any;
    placement: any;
    arrow?: boolean
}

export const CustomizedTooltip: FC<ToolTipProp> = (props: ToolTipProp) => {
    const { children, title, placement, arrow } = props
    return (
        <Tooltip title={title} placement={placement} arrow={arrow} >
            {children}
        </Tooltip>
    )
}