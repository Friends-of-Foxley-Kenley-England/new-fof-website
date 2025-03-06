import { memo } from "react";

const ExternalLink = ({ href, children, ...rest }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

export default memo(ExternalLink);
