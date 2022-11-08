import { useState } from "react";

const useFullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const open = async () => {
    const res = document.body.requestFullscreen();
    if (!!res) {
      setIsFullscreen(true);
    }
  };
  const close = async () => {
    const res = document.exitFullscreen();
    console.log(res);
  };
  return [open, close, isFullscreen, setIsFullscreen] as const;
};
export default useFullScreen;
