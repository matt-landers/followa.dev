import React from 'react';
import GravityForm, {
  GravityFormProps,
} from 'lib/components/Forms/GravityForm/GravityForm';
import Layout from 'lib/components/Layout/Layout';
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { GetStaticPropsContext } from 'next';
import { getApolloClient } from '@wpengine/headless';
import { submitForm } from 'lib/services/formSubmission';

const GET_FORM = gql`
  {
    gravityFormsForm(id: "R3Jhdml0eUZvcm1zRm9ybTox") {
      id: formId
      fields {
        nodes {
          ... on TextField {
            id
            description
            label
            type
            placeholder
            isRequired
          }
        }
      }
    }
  }
`;

type DevSubmissionPageProps = Pick<GravityFormProps, 'id' | 'fields'>;

const DevSubmissionPage: React.FC<DevSubmissionPageProps> = (props) => {
  const client = useApolloClient();

  return (
    <Layout>
      <h1>Submit a Dev</h1>
      <GravityForm
        {...props}
        onSubmit={async (id, data) => {
          const entryId = await submitForm(
            client as ApolloClient<NormalizedCacheObject>,
            id,
            data,
          );
          console.log(entryId);
        }}
      />
    </Layout>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  const { data } = await client.query({ query: GET_FORM });
  const fields = data.gravityFormsForm.fields.nodes;

  return {
    props: { id: data.gravityFormsForm.id, fields },
  };
}

export default DevSubmissionPage;
