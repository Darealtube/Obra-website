import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { SEARCH_QUERY } from "../apollo/Queries/categoryQueries";
import { Categories } from "../interfaces/PostInterface";
import { SearchData, SearchVars } from "../interfaces/QueryInterfaces";
import { Users } from "../interfaces/UserInterface";

type SearchProps = {
  key: string;
  type: "user" | "category" | "tag";
  open: boolean;
  limit?: number;
  executeOnMount?: boolean;
};

/* This is another hook originally developed that returns an option based on the key (searchInput), the type(searchType),
   and it can be configured to run onMount or not. This can be used in any component as long as the required props are 
   passed. It also supports pagination.
*/

const useSearch = ({
  key,
  type,
  open,
  limit,
  executeOnMount = false,
}: SearchProps) => {
  const [typing, setTyping] = useState(false);
  const [after, setAfter] = useState("" || null);
  const [hasMore, sethasMore] = useState(false);
  const [loadOptions, { loading, data, fetchMore: fetchMoreOptions }] =
    useLazyQuery<SearchData, SearchVars>(SEARCH_QUERY);
  // If the search bar is active, detect if the user is still typing in the search bar.
  useEffect(() => {
    let typeTimer;
    if (open) {
      setTyping(true);
      typeTimer = setTimeout(() => {
        setTyping(false);
      }, 500);
    }
    return () => {
      clearTimeout(typeTimer);
    };
  }, [open, key]);

  // If the user is not typing anymore and the search bar is active, load options.
  useEffect(() => {
    if (!typing && open) {
      loadOptions({
        variables: { key: key.trim(), type, ...(limit && { limit }) },
      });
    }
  }, [open, key, loadOptions, typing, type, limit]);

  /* 
    Since the data of loadTags can't be acquired in the same useEffect, 
    if the data changes, then options will be set alongside with after and hasMore,
    essential in pagination.
  */
  useEffect(() => {
    if (data?.search) {
      setAfter(
        type == "tag"
          ? null
          : (data?.search as Users | Categories).pageInfo.endCursor
      );
      sethasMore(
        type == "tag"
          ? false
          : (data?.search as Users | Categories).pageInfo.hasNextPage
      );
    }
  }, [data, type]);

  // If executeOnMount is active, the query will be executed upon page render (like useQuery).
  useEffect(() => {
    if (executeOnMount) {
      loadOptions({
        variables: { key: "", type, ...(limit && { limit }) },
      });
    }
  }, []);

  // This function is used for option pagination.
  const moreOptions = () => {
    fetchMoreOptions({
      variables: {
        key,
        type,
        limit,
        after,
      },
    });
  };

  return {
    loading,
    options: data?.search ? data?.search.edges : [],
    moreOptions,
    hasMore,
  };
};

export default useSearch;
