import { NotFoundBlock } from "../components/NotFoundBlock";
import { Header } from "../components";

import "../scss/app.scss";

const NotFound: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <NotFoundBlock />
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFound;
