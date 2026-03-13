import { memo, useState } from "react";
import ExternalLink from "../external-link/external-link";
import * as style from "./location-info.module.css";

const LocationInfo = ({ description, what3words, latitude, longitude }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${what3words}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const what3wordsUrl = `https://what3words.com/${what3words}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className={style.locationInfo}>
      <p className={style.description}>{description}</p>

      {/* <h3>Google Maps</h3> */}

      <ExternalLink
        href={what3wordsUrl}
        aria-label="Get directions in Google Maps">
        {/* <span className={style.what3wordsText}> */}
        Google Maps
        {/* </span> */}
      </ExternalLink>
      {/* <ExternalLink
        href={googleMapsUrl}
        aria-label="Get directions in Google Maps"
        className={style.directionsLink}>
        <svg
          className={style.directionsIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Find us in Google Maps
      </ExternalLink>
      <ExternalLink
        href={googleMapsUrl}
        aria-label="Get directions in Google Maps"
        className={style.directionsLink}>
        <svg
          className={style.directionsIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Get Directions
      </ExternalLink> */}

      {/* <h3>What3Words</h3> */}

      <div className={style.what3wordsContainer}>
        {/* {"What three words location: "} */}
        <ExternalLink
          href={what3wordsUrl}
          aria-label={`Open ${what3words} in What3Words`}>
          {/* <span className={style.what3wordsText}> */}
          {"///"}
          {what3words}
          {/* </span> */}
        </ExternalLink>
        {/* <span>What three words location code:</span> */}
        {/* <ExternalLink
          href={what3wordsUrl}
          aria-label={`Open ${what3words} in What3Words`}
          className={style.what3wordsLink}>
          {/* <svg
            className={style.what3wordsIcon}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
              d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm0 44C12.954 44 4 35.046 4 24S12.954 4 24 4s20 8.954 20 20-8.954 20-20 20z"
              fill="currentColor"
            />
            <path
              d="M16 14l-4 20h4l1-5h2l1 5h4l-4-20h-4zm0 11l1.5-7.5L19 25h-3zm8-11l-2 20h4l.5-5h1.5l.5 5h4l-2-20h-6zm1 11l.75-7.5L27 25h-2zm8-11l-1 20h4l.25-5h1.5l.25 5h4l-1-20h-8zm1.5 11l.5-7.5.5 7.5h-1z"
              fill="currentColor"
            />
          </svg> */}
        {/* <span className={style.what3wordsText}>
            {"What three words location: ///"}
            {what3words}
          </span>
        </ExternalLink> } */}
        {/* <button
          onClick={handleCopy}
          className={style.copyButton}
          aria-label="Copy What3Words address"
          title="Copy What3Words address">
          {copied ? (
            <svg
              className={style.buttonIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg
              className={style.buttonIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
          <span className={style.buttonText}>
            {copied ? "Copied!" : "Copy"}
          </span>
        </button> */}
      </div>

      {/* <ExternalLink
        href={googleMapsUrl}
        aria-label="Get directions in Google Maps"
        className={style.directionsLink}>
        <svg
          className={style.directionsIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Get Directions in Google Maps
      </ExternalLink> */}
    </div>
  );
};

export default memo(LocationInfo);
