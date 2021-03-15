import { useState, useEffect } from "react";

const usePagination = <T, U, K, O>(
  key: T,
  fetchMore: U,
  info: K[],
  key2?: O
) => {
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(info.length < 4 ? false : true);

  const More = () => {
    fetchMore({
      variables: { offset: info.length },
    }).then((fetchMoreResult) => {
      if (
        (key2
          ? fetchMoreResult.data[`${key}`][`${key2}`].length
          : fetchMoreResult.data[`${key}`].length) < 4
      ) {
        sethasMore(false);
      }
    });
    setPage((prevpage) => prevpage + 1);
  };

  useEffect(() => {
    if (info.length < page * 4 && hasMore) {
      fetchMore({
        variables: { offset: page * 4 - 4 },
      }).then((fetchMoreResult) => {
        if (
          (key2
            ? fetchMoreResult.data[`${key}`][`${key2}`].length
            : fetchMoreResult.data[`${key}`].length) < 4
        ) {
          sethasMore(false);
        }
      });
    }
  }, [info.length]);

  return { More, page, hasMore };
};

export default usePagination;
