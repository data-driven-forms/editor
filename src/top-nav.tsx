import React from 'react'
import { Pane, majorScale, Heading } from 'evergreen-ui'

const TopNav = () => {
    return <Pane
        is="nav"
        width="100%"
        position="sticky"
        top={0}
        backgroundColor="white"
        zIndex={10}
        height={majorScale(5)}
        flexShrink={0}
        display="flex"
        alignItems="center"
        borderBottom="muted"
        paddingX={majorScale(2)}
    >
        <Pane display="flex" alignItems="center" width={236}>
            <Heading size={500}>
                Data Driven Forms Pro Editor
            </Heading>
        </Pane>
        <Pane flex={1}>
        </Pane>
        <Pane display="flex" justifyContent="flex-end" width={236}>
        </Pane>
    </Pane>
}

export default TopNav;
