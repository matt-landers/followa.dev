import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { GravityFormData } from 'lib/components/Forms/GravityForm/GravityForm';

async function createForm(
  client: ApolloClient<NormalizedCacheObject>,
  formId: number,
): Promise<string> {
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateForm($formId: Int!) {
        createGravityFormsDraftEntry(input: { formId: $formId }) {
          resumeToken
        }
      }
    `,
    variables: {
      formId,
    },
  });
  return data.createGravityFormsDraftEntry.resumeToken;
}

function saveFields(
  client: ApolloClient<NormalizedCacheObject>,
  resumeToken: string,
  data: GravityFormData,
) {
  const allUpdates = Object.keys(data).map((key) => {
    const field = data[key].field;
    const value = data[key].value;

    return client.mutate({
      mutation: gql`
        mutation SaveField(
          $resumeToken: String!
          $fieldId: Int!
          $value: String!
        ) {
          updateDraftEntryTextFieldValue(
            input: {
              resumeToken: $resumeToken
              fieldId: $fieldId
              value: $value
            }
          ) {
            resumeToken
            errors {
              message
            }
          }
        }
      `,
      variables: {
        resumeToken,
        fieldId: field.id,
        value,
      },
    });
  });

  return Promise.all(allUpdates);
}

async function finalizeForm(
  client: ApolloClient<NormalizedCacheObject>,
  resumeToken: string,
): Promise<string> {
  const { data } = await client.mutate({
    mutation: gql`
      mutation FinalizeForm($resumeToken: String!) {
        submitGravityFormsDraftEntry(input: { resumeToken: $resumeToken }) {
          entryId
        }
      }
    `,
    variables: {
      resumeToken,
    },
  });
  return data.submitGravityFormsDraftEntry.entryId;
}

async function validateTwitterHandle(handle: string) {
  const result = await fetch(`/api/twitter/handle/${handle}`);
  return result.ok;
}

export async function submitForm(
  client: ApolloClient<NormalizedCacheObject>,
  formId: number,
  data: GravityFormData,
) {
  const twitterField = Object.keys(data).find(
    (key) => data[key].field.label.toLowerCase() === 'twitter',
  );
  try {
    if (!(await validateTwitterHandle(data[twitterField as string].value))) {
      throw new Error('Invalid Twitter handle.');
    }
    const resumeToken = await createForm(client, formId);
    await saveFields(client, resumeToken, data);
    const entryId = finalizeForm(client, resumeToken);
    return entryId;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
