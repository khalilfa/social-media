import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Grid, GridColumn, Image } from 'semantic-ui-react'

import PostCard from '../components/PostCard';

function Home() {
  const { loading, data: getPosts } = useQuery(FETCH_POSTS_QUERY);

  console.log(getPosts.getPosts);

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          getPosts && getPosts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id body createdAt username likeCount
      likes{
        username
      }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`;

export default Home;