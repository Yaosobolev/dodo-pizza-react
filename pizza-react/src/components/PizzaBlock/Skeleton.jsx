import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="content__items"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="55" rx="0" ry="0" width="280" height="0" />
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="332" rx="10" ry="10" width="280" height="70" />
    <rect x="0" y="282" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="456" rx="10" ry="10" width="90" height="20" />
    <rect x="117" y="431" rx="20" ry="20" width="150" height="46" />
  </ContentLoader>
);

export default Skeleton;
