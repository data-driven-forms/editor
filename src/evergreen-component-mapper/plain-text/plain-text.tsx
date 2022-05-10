import React from 'react';

import { Paragraph, ParagraphProps } from 'evergreen-ui';

interface PlainTextProps extends ParagraphProps {
    content: string;
};

const PlainText: React.FC<PlainTextProps> = ({ content, ...rest }) => {
    return (
        <Paragraph {...rest}>
            {content}
        </Paragraph>
    );
};

export default PlainText;
