import { useState, useEffect, useCallback } from "react";
import { PageInfo } from "../interfaces/PostInterface";

interface edges {
  node: any;
}

interface Info {
  edges: edges[];
  pageInfo: PageInfo;
  totalCount: number;
}

const usePagination = (
  key: string,
  fetchMore,
  info: Info,
  key2?: string,
  drawerOpen?: boolean
) => {
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(info?.pageInfo.hasNextPage);
  const [refetching, setRefetching] = useState(false);
  const [node, setNode] = useState<HTMLElement>();
  const ref = useCallback((node: HTMLElement) => {
    setNode(node);
  }, []);
  const [isScrollable, setisScrollable] = useState(
    node?.scrollHeight > node?.clientHeight
  );

  useEffect(() => {
    if (node && isScrollable === false) {
      if (drawerOpen === true && hasMore === true) {
        More();
      }
      setisScrollable(node?.scrollHeight > node?.clientHeight);
    }
  }, [drawerOpen, node, isScrollable, hasMore, page]);

  const More = () => {
    if (!refetching) {
      fetchMore({
        variables: { after: info?.edges.slice(-1)[0].node.id },
      }).then((fetchMoreResult) => {
        if (fetchMoreResult.data[`${key}`]) {
          setPage((prevpage) => prevpage + 1);
          if (
            (key2
              ? fetchMoreResult.data[`${key}`][`${key2}`].pageInfo.hasNextPage
              : fetchMoreResult.data[`${key}`].pageInfo.hasNextPage) == false
          ) {
            sethasMore(false);
          }
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

  return { More, hasMore, ref };
};

export default usePagination;
