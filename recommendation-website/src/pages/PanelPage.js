import React, { useContext } from "react";
import { YTAPI } from "../ytapi";
import { UserContext } from "../UserContext";

const PanelPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900">
      <div className="p-4">
        <h1 className="text-xl text-white font-bold">
          {user && user.codeId && <div>Room Code: {user.codeId}</div>}
        </h1>
      </div>
      <div className="flex-1 overflow-auto">
        <YTAPI />
      </div>
    </div>
  );
};

export default PanelPage;
