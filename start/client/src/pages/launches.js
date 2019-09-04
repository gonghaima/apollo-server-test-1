import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LaunchTile, Header, Button, Loading } from "../components";

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;

export default function Launches() {
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES);
  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      {data.launches && data.launches.hasMore && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                after: data.launches.cursor
              },

              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  launches: {
                    ...fetchMoreResult.launches,
                    launches: [
                      ...prev.launches.launches,
                      ...fetchMoreResult.launches.launches
                    ]
                  }
                };
              }
            })
          }
        >
          Load More
        </Button>
      )}
    </Fragment>
  );
}
