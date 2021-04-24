import { Routes } from "./Routes";
import "./../assets/scss/App.scss";

export const App = (): JSX.Element => {
  return (
    <div className="wrapper">
      <Routes />
    </div>
  );
};
