import { gql, useQuery } from '@apollo/client';
import { getApolloClient } from '@wpengine/headless';
import { getNextStaticProps } from '@wpengine/headless/next';
import Card from 'lib/components/Card/Card';
import Layout from 'lib/components/Layout/Layout';
import { Developer } from 'lib/types';
import { GetStaticPropsContext } from 'next';
import React from 'react';

const GET_ALL_DEVS = gql`
  query GetDevelopers($language: [String]) {
    developers(
      where: {
        taxQuery: {
          relation: AND
          taxArray: [
            { terms: $language, taxonomy: TAG, operator: IN, field: SLUG }
          ]
        }
      }
    ) {
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

const Filter = ({ language }: { language: string }) => {
  const { data } = useQuery(GET_ALL_DEVS, {
    variables: {
      language,
    },
  });

  const developers: { data: Developer }[] = data?.developers?.nodes ?? [];
  return (
    <Layout>
      {developers.map((developer) => (
        <Card key={developer.data.twitter} {...developer.data} />
      ))}
    </Layout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  let filter = context.params?.filter;

  if (Array.isArray(filter)) {
    filter = filter[0];
  }

  const client = getApolloClient(context);
  const { data } = await client.query({
    query: GET_ALL_DEVS,
    variables: {
      language: filter,
    },
  });

  const props = await getNextStaticProps(context);
  props.revalidate = 1;
  props.props = props.props ?? {};
  props.props.language = filter;
  return props;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { filter: 'react' } }],
    fallback: 'blocking',
  };
}

export default Filter;
