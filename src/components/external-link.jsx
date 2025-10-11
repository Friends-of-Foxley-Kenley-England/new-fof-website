import { memo } from "react";

const ExternalLink = ({ href, children, "aria-label": ariaLabel, ...rest }) => {
  const accessibleLabel = ariaLabel
    ? `${ariaLabel} (opens in new tab)`
    : undefined;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      title={accessibleLabel || "Opens in new tab"}
      {...rest}>
      {children}
    </a>
  );
};

export default memo(ExternalLink);
