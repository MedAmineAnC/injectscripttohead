import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const QUERY_SCRIPTS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPT = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

function InjectScript() {
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const { loading, error, data } = useQuery(QUERY_SCRIPTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <h1>This is the Script Page:</h1>
      <button
        type="submit"
        onClick={() => {
          createScripts({
            variables: {
              input: {
                src: "https://729d66615b36.ngrok.io/test-script.js",
                displayScope: "ALL",
              },
              refetchQueries: [{ query: QUERY_SCRIPTS }],
            },
          });
        }}
      >
        Create a Script
      </button>
      {data.scriptTags.edges.map((item) => {
        return (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
          </div>
        );
      })}
    </>
  );
}
export default InjectScript;
