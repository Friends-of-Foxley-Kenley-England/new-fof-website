import React, { memo } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as style from "./work-day-widget.module.css";

const WorkDayWidget = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulWorkDay(sort: { dateOfWorkday: DESC }, limit: 3) {
        nodes {
          slug
          id
          title
        }
      }
    }
  `);

  const workdays = data.allContentfulWorkDay?.nodes || [];

  return (
    <div data-testid="work-days-widget" className={style.workDaysWidget}>
      <h3 className={style.workDaysWidgetTitle}>Recent work days</h3>
      {workdays.length > 0 ? (
        <ul className={style.workDaysList}>
          {workdays.slice(0, 3).map(workday => (
            <li key={workday.slug}>
              <Link to={`/work-days/${workday.slug}`}>{workday.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent work days scheduled.</p>
      )}
      <p className={style.seeAllLink}>
        <Link to="/work-days">See all work days →</Link>
      </p>
    </div>
  );
};

export default memo(WorkDayWidget);
