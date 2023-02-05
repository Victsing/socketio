import NightLightModeComponent from "./components/NightLightModeComponent";
import ViewsComponent from "./components/ViewsComponent";
import UserContext from "./components/AccountContext";

function App() {
  return (
    <UserContext>
      <ViewsComponent/>
      <NightLightModeComponent />
    </UserContext>
  );
}

export default App;