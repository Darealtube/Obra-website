import { DataProxy, FetchResult } from "@apollo/client";
import {
  COMMISSIONS_QUERY,
  PENDING_COMMS_QUERY,
  PostInfo,
  POST_ID_QUERY,
  UserInfo,
  UserInfo2,
} from "../apollo/apolloQueries";
import {
  AcceptCommissionData,
  AddCommentData,
  EditPostData,
  EditUserData,
} from "../interfaces/MutationInterfaces";
import {
  CommissionData,
  CommissionVars,
  PostData,
  PostVars,
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
  const { postId } = cache.readQuery<PostData, PostVars>({
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

export const acceptCommission = (
  cache: DataProxy,
  mutationResult: FetchResult<
    AcceptCommissionData,
    Record<string, any>,
    Record<string, any>
  >,
  id: string
) => {
  const newCommission = mutationResult.data.acceptCommission;
  const { userId } = cache.readQuery<CommissionData, CommissionVars>({
    query: COMMISSIONS_QUERY,
    variables: { id: id },
  });
  const { userId: userId2 } = cache.readQuery<CommissionData, CommissionVars>({
    query: PENDING_COMMS_QUERY,
    variables: { id: id },
  });
  const newPending = userId2.pendingCommissions.edges.filter(
    (commission) => commission.node.id != newCommission.id
  );
  cache.writeQuery({
    query: COMMISSIONS_QUERY,
    variables: { id: id },
    data: {
      userId: {
        ...userId,
        commissions: {
          ...userId.commissions,
          edges: [
            { __typename: "CommissionEdge", node: newCommission },
            ...userId.commissions.edges,
          ],
        },
      },
    },
  });
  cache.writeQuery({
    query: PENDING_COMMS_QUERY,
    variables: { id: id },
    data: {
      userId: {
        ...userId2,
        pendingCommissions: {
          ...userId2.pendingCommissions,
          edges: newPending,
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
      artStyles: newUser.artStyles,
      artKinds: newUser.artKinds,
      age: newUser.age,
    },
  });
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
  const newUser = mutationResult.data.editPost;
  cache.writeFragment({
    id: `Post:${id}`,
    fragment: PostInfo,
    data: {
      id: newUser.id,
      title: newUser.title,
      description: newUser.description,
      tags: newUser.tags,
    },
  });
};
