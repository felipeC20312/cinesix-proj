import { BrowserRouter } from "react-router-dom";
import RouterApp from "./RouterApp";
import DKAudioHdlButton from "@/lib/utils/DKAudioHdlButton";

function App() {
  return (
    <BrowserRouter>
      <DKAudioHdlButton src="/assets/audios/game-music-loop.mp3" />
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
