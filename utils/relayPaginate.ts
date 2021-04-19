type RelayPaginate = {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: {
    node: any;
  }[];
};

const relayPaginate = (
  finalArray: any[],
  after: string,
  limit: number
): RelayPaginate => {
  const cursor = finalArray
    .map(function (e) {
      return e.id;
    })
    .indexOf(after);

  const final = finalArray.slice(
    after && cursor != -1 ? cursor + 1 : 0,
    after && cursor != -1 ? limit + cursor + 1 : limit
  );

  return {
    totalCount: finalArray.length,
    pageInfo: {
      endCursor: final[final.length - 1]?.id,
      hasNextPage:
        final[final.length - 1]?.id == finalArray[finalArray.length - 1]?.id
          ? false
          : true,
    },
    edges: final.map((a) => ({ node: a })),
  };
};

export default relayPaginate;
