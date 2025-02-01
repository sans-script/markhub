import Home from "../../page";

export default async function DynamicPage({ params }) {
  const { id } = params;
  return <Home fileId={id} />;
}
