import type { HeaderProps } from "./index.types";
import cupSvg from "!/cup-svgrepo-com.svg";
import keyboardSvg from "!/keyboard-svgrepo-com.svg";

const Header: React.FC<HeaderProps> = ({ bestWPM }) => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={keyboardSvg} width={20} height={20} />
        <h1 className="text-lg font-semibold text-gray-200">
          Typing Speed Test
        </h1>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <img src={cupSvg} width={20} height={20} />
        <span className="text-gray-400">Personal best:</span>
        <span className="text-white font-semibold">{bestWPM} WPM</span>
      </div>
    </header>
  );
};

export default Header;
