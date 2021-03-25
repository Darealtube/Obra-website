import { useState, useEffect } from "react";

const usePagination = <T, U, K, O>(
  key: string,
  fetchMore,
  info,
  key2?: string
) => {
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(info?.pageInfo.hasNextPage);
  const [refetching, setRefetching] = useState(false);

  const More = () => {
    if (!refetching) {
      fetchMore({
        variables: { after: info?.edges.slice(-1)[0].node.id },
      }).then((fetchMoreResult) => {
        setPage((prevpage) => prevpage + 1);
        if (
          (key2
            ? fetchMoreResult.data[`${key}`][`${key2}`].pageInfo.hasNextPage
            : fetchMoreResult.data[`${key}`].pageInfo.hasNextPage) == false
        ) {
          sethasMore(false);
        }
      });
    }
  };

  useEffect(() => {
    if (info?.edges.length < page * 4 && hasMore) {
      setRefetching(true);
      fetchMore({
        variables: { cursor: info?.edges[page * 4 - 5] },
      }).then((fetchMoreResult) => {
        if (
          (key2
            ? fetchMoreResult.data[`${key}`][`${key2}`].pageInfo.hasNextPage
            : fetchMoreResult.data[`${key}`].pageInfo.hasNextPage) == false
        ) {
          sethasMore(false);
        }
        setRefetching(false);
      });
    }
  }, [info?.edges.length, hasMore]);

  return { More, hasMore };
};

export default usePagination;
