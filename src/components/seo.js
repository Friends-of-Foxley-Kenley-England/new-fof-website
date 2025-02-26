import logo from "../images/logo.png";

const friendsOfFoxleyOrgName = "Friends Of Foxley";
const defaultDescription =
  "The Friends of Foxley are a group of volunteers who manage Foxley Wood in Kenley, Surrey.";

const Seo = ({
  titlePrefix,
  description = defaultDescription,
  noIndex = false,
}) => {
  const title = !!titlePrefix ? `${titlePrefix} | ${friendsOfFoxleyOrgName}` : friendsOfFoxleyOrgName;

  return (
    <>
      <meta name="viewport"></meta>
      <html lang="en" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content="website" />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />
      <meta name="keywords" content="friends of foxley, foxley woods purley, kenley woods, purley woods, higher drive recreation ground purley" />
      <meta name="author" content={friendsOfFoxleyOrgName} />
      <meta property="og:url" content="www.friendsoffoxley.co.uk" />
      <meta property="og:site_name" content={friendsOfFoxleyOrgName} />
      <meta
        name="author"
        content={`${friendsOfFoxleyOrgName} - Volunteer Group`}
      />
    </>
  );
};

export default Seo;
