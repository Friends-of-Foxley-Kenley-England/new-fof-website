import logo from "../images/logo.png";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const Seo = ({ title, pathname: canonical, description, noIndex = false }) => {
  const {
    description: defaultDescription,
    locale,
    organisationName,
    siteUrl,
    title: defaultTitle,
  } = useSiteMetadata();

  const seo = {
    description: description || defaultDescription,
    locale,
    organisationName,
    title: !!title ? `${title} | ${organisationName}` : defaultTitle,
    url: `${siteUrl}${canonical || ``}`,
  };

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <html lang="en" />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:type" content="website" />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <title>{seo.title}</title>
      <meta property="og:title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta property="og:description" content={seo.description} />
      <meta name="image" content={logo} />
      <meta property="og:image" content={logo} />
      <meta
        name="keywords"
        content="friends of foxley, foxley woods purley, kenley woods, purley woods, higher drive recreation ground purley"
      />
      <meta name="author" content={seo.organisationName} />
      <meta property="og:site_name" content={seo.organisationName} />

      {seo?.url && (
        <>
          <link rel="canonical" href={seo.url} />
          <meta property="og:url" content={seo.url} />
        </>
      )}
    </>
  );
};

export default Seo;
