import { GetStaticPropsContext } from 'next';
import { getApolloClient } from '@wpengine/headless';
import { useQuery, gql } from '@apollo/client';
import { getNextStaticProps } from '@wpengine/headless/next';
import React from 'react';
import Layout from 'lib/components/Layout/Layout';
import { Developer } from 'lib/types';
import Card from 'lib/components/Card/Card';

const GET_ALL_DEVS = gql`
  {
    developers {
      nodes {
        data: acfDeveloper {
          company
          github
          languages {
            name
          }
          name
          twitter
          personalBlog
        }
      }
    }
  }
`;

const Home = () => {
  const { data } = useQuery(GET_ALL_DEVS);

  const developers: { data: Developer }[] = data?.developers?.nodes ?? [];
  return (
    <Layout>
      {developers.map((developer) => (
        <Card key={developer.data.twitter} {...developer.data} />
      ))}
    </Layout>
  );
};

interface StaticPropsResult {
  revalidate?: number | boolean;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  await client.query({
    query: GET_ALL_DEVS,
  });

  const props = (await getNextStaticProps(context)) as StaticPropsResult;
  props.revalidate = 1;

  return props;
}

export default Home;
