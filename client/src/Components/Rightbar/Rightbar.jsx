import { Users } from "../../dummyData";
import Online from "../Online/Online";
import ProfileRightbar from "../ProfileRightbar/ProfileRightbar";
import "./rightbar.css";
import { useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
const YoutubeMusicApi = require("youtube-music-api");

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { username } = useParams();
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, [socket]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [socket]);

  useEffect(() => {
    const getSongs = () => {
      var axios = require("axios").default;

      var options = {
        method: "POST",
        url: "https://deezerzakutynskyv1.p.rapidapi.com/searchAlbums",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-key":
            "0c170dd28amsh28dede860351eb0p1e1a3ajsn1574ccb6619f",
          "x-rapidapi-host": "DeezerzakutynskyV1.p.rapidapi.com",
        },
        data: { searchQuery: "eminem", accessToken: "<REQUIRED>" },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getSongs();
  }, []);

  const HomeRightbar = () => {
    return (
      <div
        className="container-fluid"
        style={{
          height: "calc(100vh - 55px)",
          overflow: "scroll",
        }}
      >
        {/* <div className="row">
          <div className="d-flex my-3 mx-2">
            <div>
              <img src={`${PF}gift.png`} height="40px" width="40px"></img>
            </div>
            <div className="ml-1">
              <span>
                <b>Deep</b> and <b>3 other Friend</b> has birthday today
              </span>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="ml-1 mt-3 mb-1">
            <span>
              <b>Advertisment :</b>
            </span>
          </div>
          <div className="my-1 ml-2">
            <img
              src={`${PF}add.png`}
              alt=""
              width="95%"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="my-1 ml-3">
            <span className="font-weight-bold">Online Friends</span>
            <ul className="list-group">
              {onlineUsers.map((user) => (
                <Online key={user._id} userId={user} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {username ? (
        <ProfileRightbar key={user._id} user={user} />
      ) : (
        <HomeRightbar />
      )}
    </>
  );
}
