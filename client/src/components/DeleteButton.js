import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

import { Icon, Button, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/graphql'
import MyPopup from '../utils/MyPopup';

function DeleteButton({ postId, commentId, callback, popupComment }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
    update(proxy){
      setConfirmOpen(false);

      if(callback) callback();
    },
    variables: {
      postId,
      commentId
    },
    onError(err) {
      console.log('Entra aca');
      console.error(err);
    }
  })

  return (
    <>
      <MyPopup content={popupComment}>
        <Button 
          as="div" 
          color="red" 
          onClick={() => setConfirmOpen(true)}
          floated="right"
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id username createdAt body
      }
      commentCount
    }
  }
`;


export default DeleteButton;
