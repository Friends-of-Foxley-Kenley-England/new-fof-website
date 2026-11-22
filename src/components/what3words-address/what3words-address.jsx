import ExternalLink from "../external-link";
import * as style from "./what3words-address.module.css";

const What3wordsAddress = ({ words, description }) => (
  <ExternalLink
    href={`https://map.what3words.com/${words}`}
    className={style.address}
    aria-label={`View ///${words} on what3words${description ? `: ${description}` : ""}`}
  >
    <span aria-hidden="true">{"///"}</span>
    {words}
  </ExternalLink>
);

export default What3wordsAddress;
