import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as style from "./index.module.css";
import WorkDayWidget from "../components/work-day-widget";
import process from "process";

const HomeIndex = ({ location }) => {
  return (
    <Layout location={location} showHeroSection useWideLayout>
      <div className={style.homeContainer}>
        <div data-testid="main-content" className={style.mainContent}>
          <p>
            The Friends Of Foxley are a group of local people who work in
            partnership with Croydon Council to protect and manage the nature
            conservation interest of Foxley Wood Local Nature Reserve in Purley
            for people and wildlife.
          </p>
          <h2>How can I help?</h2>
          <p>
            If you enjoy fresh air and light exercise come and help us look
            after the Foxley Wood Local Nature Reserve located on the
            Purley/Kenley borders in Surrey.
          </p>

          <p>
            Go to <Link to="/work-days">Work Days</Link> to see the work we are
            planning in Foxley Wood this month and where we will meet.
          </p>
          <p>
            All are welcome and any time you can give on the day will be most
            appreciated. Tools and equipment are provided, but please wear
            appropriate clothes and footwear and bring your own refreshments.
          </p>
          <p>
            Being a Friends of Foxley volunteer does not necessarily mean doing
            physical work, recorders of wildlife and people with skills in fund
            raising, advertising, IT and liaising are equally vital to the group
            and the conservation of Foxley Wood. If you would like to become a
            member of the Friends of Foxley without any obligation please
            download our membership form.
          </p>
          <p>
            <Link to="/wood-products">Wood products</Link>: excellent value
          </p>
        </div>

        <div
          data-testid="work-days-widget-container"
          className={style.workDaysWidgetContainer}>
          <WorkDayWidget />
        </div>
      </div>
    </Layout>
  );
};

export default HomeIndex;

export function Head() {
  const reshepeApiKey = process.env.GATSBY_RESHEPE_PUBLIC_KEY;

  if (reshepeApiKey) {
    return (
      <>
        <script
          id="reshepe-webvitals"
          async
          data-api-key={reshepeApiKey}
          src="https://cdn.jsdelivr.net/npm/@reshepe-web-vitals/js/dist/index.global.js"></script>
        <Seo />
      </>
    );
  } else {
    return <Seo />;
  }
}
