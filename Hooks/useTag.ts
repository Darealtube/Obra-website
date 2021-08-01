import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { SEARCH_TAGS_QUERY } from "../apollo/apolloQueries";

const useTag = (tag: string, open: boolean) => {
  const [options, setOptions] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loadTags, { loading, data, called }] = useLazyQuery(SEARCH_TAGS_QUERY);

  useEffect(() => {
    let typeTimer;
    const handleUp = () => {
      typeTimer = setTimeout(() => {
        setTyping(false);
      }, 500);
    };
    const handleDown = () => {
      clearTimeout(typeTimer);
      setTyping(true);
    };

    if (open) {
      window.addEventListener("keyup", handleUp);
      window.addEventListener("keydown", handleDown);
    } else {
      window.removeEventListener("keyup", handleUp);
      window.removeEventListener("keydown", handleDown);
      clearTimeout(typeTimer);
    }

    return () => {
      window.removeEventListener("keyup", handleUp);
      window.removeEventListener("keydown", handleDown);
      clearTimeout(typeTimer);
    };
  }, [open]);

  useEffect(() => {
    if (open && tag.trim().length > 0 && !typing) {
      loadTags({
        variables: { tag: tag },
      });
    }

    if (!tag.trim()) {
      setOptions([]);
    }
  }, [open, tag, loadTags, typing]);

  useEffect(() => {
    if (!loading && called && data?.searchTags && tag.trim().length > 0) {
      setOptions(data?.searchTags);
    }
  }, [tag, data, called, loading]);

  return { loading, options };
};

export default useTag;
