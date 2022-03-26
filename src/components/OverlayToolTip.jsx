import React from 'react'
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function OverlayToolTip(props) {
    const { toolTipMessage, text } = props;
    return (
        <OverlayTrigger
            placement='top'
            overlay={
              <Tooltip>
                {toolTipMessage}
              </Tooltip>
            }
          >
            <td>
              <b>
                {text}:
              </b>
            </td>
          </OverlayTrigger>
    )
}
