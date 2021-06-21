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

/* 
 usePagination handles the pagination for all of the lists that are used widely around 
 the entire app, from posts, to commissions. usePagination accepts mainly 4 parameters, 
 with 2 optional parameters. 
 
 The first parameter, "key" accepts the main "key" of the 
 returned data from the query (e.g. "userName","userId","postId", etc.). The second parameter,
 "fetchMore", will accept the fetchMore function that is returned from useQuery, and it will 
 be used here. The third parameter, "info", accepts the returned "edges" from the query (since
 it uses a relayStylePagination). The edges consists of the actual list, extra information about
 the list, and the list's total count. The fourth parameter, "limit", accepts the number of how 
 many posts shall be paginated. This number must be similar to the limit variable that is passed 
 in useQuery. 

 The first optional parameter, "key2", will accept the second key if the list is inside a main information.
 For example, a user's posts are inside either "userName" or "userId" that is passed as a "key", then their
 "posts" will be passed as the second key, depending on the query. The second optional parameter is "execute".
 It is a boolean that will determine if the query must execute until the element is scrollable. There is a bug in
 InfiniteScroll component that will not paginate the list when it is smaller than the actual element, in other words,
 unscrollable. The returned "ref" is the helper, as it will help determine if the element is scrollable or not.
 */

const usePagination = (
  key: string,
  fetchMore,
  info: Info,
  limit: number,
  key2?: string | null,
  execute?: boolean
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

  // This useEffect executes More function until the element that has the
  // ref "ref" is scrollable. It will also mark as "refetching" when it does this,
  // and it is used in order to organize query requests.
  useEffect(() => {
    if (node && isScrollable === false) {
      if (execute === true && hasMore === true) {
        setRefetching(true);
        More();
        setRefetching(false);
      }
      setisScrollable(node?.scrollHeight > node?.clientHeight);
    }
  }, [execute, node, isScrollable, hasMore]);

  // More will only execute when the hook is not performing any other action such as execute
  // or when a user deletes a post and needs to paginate one post in replace.
  const More = () => {
    if (!refetching) {
      fetchMore({
        variables: { after: info?.edges.slice(-1)[0].node.id, limit: limit },
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

  // This useEffect handles the event when a user deletes something from the list while the
  // list still has a next page of items. It will always fetch ONE more item in replace to the
  // item deleted.

  useEffect(() => {
    if (info?.edges.length < page * limit && hasMore) {
      setRefetching(true);
      fetchMore({
        variables: { after: info?.edges.slice(-1)[0].node.id, limit: 1 },
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
