import { DataProxy, FetchResult } from "@apollo/client";
import {
  COMMISSIONS_QUERY,
  PostInfo,
  POST_ID_QUERY,
  UserInfo,
  UserInfo2,
  UserInfo3,
} from "../apollo/apolloQueries";
import {
  AddCommentData,
  EditPostData,
  EditUserCommData,
  EditUserData,
} from "../interfaces/MutationInterfaces";
import {
  CommissionData,
  PostData,
  QueryIdVars,
} from "../interfaces/QueryInterfaces";

/* These are the update functions used for useMutations. In order to update
 the UI in response to action such as deleting items or adding items, useMutation
 must update the cache manually in order for it to make it look like the changes 
 happened immediately. Primarily, these update functions take 2 parameters. The 
 first one is the cache in which the "update" option in useMutation provides, and
 the second one is the mutationResult which the "update" option also provides, but 
 the result depends on the mutation. You may see these functions from the useMutations 
 in different files/pages, and here is where they are found. */

export const commentUpdate = (
  cache: DataProxy,
  mutationResult: FetchResult<
    AddCommentData,
    Record<string, any>,
    Record<string, any>
  >,
  id: string
) => {
  const newComment = mutationResult.data.createComment;
  const { postId } = cache.readQuery<PostData, QueryIdVars>({
    query: POST_ID_QUERY,
    variables: { id: id },
  });

  cache.writeQuery({
    query: POST_ID_QUERY,
    variables: { id: id },
    data: {
      postId: {
        ...postId,
        comments: {
          ...postId.comments,
          edges: [
            { __typename: "CommentEdge", node: newComment },
            ...postId.comments.edges,
          ],
        },
      },
    },
  });
};

export const finishCommissionUpdate = (
  cache: DataProxy,
  id: string,
  commissionId: string
) => {
  const { userId } = cache.readQuery<CommissionData, QueryIdVars>({
    query: COMMISSIONS_QUERY,
    variables: { id: id },
  });

  const newCommList = userId.commissions.edges.filter(
    (commission) => commission.node.id != commissionId
  );

  cache.writeQuery({
    query: COMMISSIONS_QUERY,
    variables: { id: id },
    data: {
      userId: {
        ...userId,
        commissions: {
          ...userId.commissions,
          edges: newCommList,
        },
      },
    },
  });
};

export const editUserUpdate = (
  cache: DataProxy,
  mutationResult: FetchResult<
    EditUserData,
    Record<string, any>,
    Record<string, any>
  >,
  id: string
) => {
  const newUser = mutationResult.data.editUser;
  if (newUser) {
    cache.writeFragment({
      id: `User:${id}`,
      fragment: UserInfo,
      data: {
        id: newUser.id,
        name: newUser.name,
        image: newUser.image,
      },
    });
    cache.writeFragment({
      id: `User:${id}`,
      fragment: UserInfo2,
      data: {
        email: newUser.email,
        backdrop: newUser.backdrop,
        userBio: newUser.userBio,
        birthday: newUser.birthday,
        country: newUser.country,
        phone: newUser.phone,
        artLevel: newUser.artLevel,
        age: newUser.age,
      },
    });
  }
};

export const editUserCommSettingUpdate = (
  cache: DataProxy,
  mutationResult: FetchResult<
    EditUserCommData,
    Record<string, any>,
    Record<string, any>
  >,
  id: string
) => {
  const newUser = mutationResult.data.editUserComm;
  if (newUser) {
    cache.writeFragment({
      id: `User:${id}`,
      fragment: UserInfo3,
      data: {
        id: newUser.id,
        commissionPoster: newUser.commissionPoster,
        commissionRates: newUser.commissionRates,
      },
    });
  }
};

export const editPostUpdate = (
  cache: DataProxy,
  mutationResult: FetchResult<
    EditPostData,
    Record<string, any>,
    Record<string, any>
  >,
  id: string
) => {
  const newPost = mutationResult.data.editPost;
  if (newPost) {
    cache.writeFragment({
      id: `Post:${id}`,
      fragment: PostInfo,
      data: {
        id: newPost.id,
        title: newPost.title,
        description: newPost.description,
        tags: newPost.tags.map((tag) => tag.name),
      },
    });
  }
};
