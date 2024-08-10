import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { YTAPI } from "../ytapi";
import { UserContext } from "../UserContext";

// Panel Page
const PanelPage = () => {
  const { user } = useContext(UserContext);
  const [channelIds, setChannelIds] = useState([]);
  // const channelIds = [
  //   "UChIs72whgZI9w6d6FhwGGHA",
  //   "UCdqp0KK_Io7TwK5cJMBvB0Q",
  //   "UCrwObTfqv8u1KO7Fgk-FXHQ",
  //   "UCoUluzWcoIO3eHa5F7SJnxg",
  // ];

  useEffect(() => {
    (async () => {
      if (user && user.roomCode) {
        try {
          const response = axios.get(`${URL}/channels`, {
            params: { codeId: user.roomCode },
          });
          const { subscriptions } = response.data;
          setChannelIds(subscriptions);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [user]);

  // Return Page
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900">
      {channelIds.length > 0 ? (
        <>
          <div className="p-4">
            <h1 className="text-xl text-white font-bold">
              {user && user.codeId && <div>Room Code: {user.codeId}</div>}
            </h1>
          </div>
          <div className="flex-1 overflow-auto">
            <YTAPI channelIds={channelIds} />
          </div>
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  );
};

export default PanelPage;
