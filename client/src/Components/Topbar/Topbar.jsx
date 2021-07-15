import React from "react";
import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  ChatBubbleOutline,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [searchUser, setSearchUser] = useState([]);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        if (text != "") {
          const res = await axios.get(`/users/allUsers?pattern=${text}`);
          setSearchUser(res.data);
        } else {
          setSearchUser([]);
        }
      } catch (err) {
        console.log("Topbar File Error");
      }
    };
    getUser();
  }, [text]);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row height150 bg-primary">
          <div className="col-4 d-flex">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                paddingTop: "8px",
              }}
            >
              <span className="pl-3 pt-2 text-white font-weight-bold h2">
                Codecial
              </span>
            </Link>
          </div>

          <div
            className="col-4 pt-1 bg-white"
            style={{ borderRadius: "30px", margin: "8px 0px" }}
          >
            <div className="d-flex align-items-center">
              <Search style={{ fontSize: "25px" }} />
              <input
                placeholder=" Search for friends"
                className="form-control border-0"
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
            <div
              style={{
                width: "400px",
                zIndex: "1",
                position: "absolute",
                left: "40px",
                backgroundColor: "white",
                // boxShadow: "0px 0px 1px black inset",
              }}
            >
              {focused ? (
                searchUser.length > 0 ? (
                  <ul className="list-group " style={{ listStyle: "none" }}>
                    {searchUser.map((user) => (
                      <li
                        key={user._id}
                        className="mt-2 mx-2  hoverName"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <Link
                          to={`/profile/${user?.username}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        > */}
                        <div className="d-flex align-items-center bg-danger">
                          <img
                            onClick={handleClick}
                            src={
                              user && user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "noUserImage.png"
                            }
                            alt=""
                            style={{ height: "32px", width: "32px" }}
                            className="rounded-circle ml-2 my-2"
                          ></img>
                          <span className="ml-2">{user.username}</span>
                          {/* </Link> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-group " style={{ listStyle: "none" }}>
                    <li className="m-2">No user Found</li>
                  </ul>
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="col-2 pt-3 text-white">
            <Link
              className="text-white"
              to="/"
              style={{ textDecoration: "none" }}
            >
              Timeline
            </Link>
          </div>

          <div className="col-2 d-flex">
            <div
              className="d-flex justify-content-around pt-3 text-white"
              style={{ width: "70%" }}
            >
              <Badge badgeContent={1} color="error">
                <Person />
              </Badge>
              <Badge badgeContent={1} color="error">
                <Chat />
              </Badge>
              <Badge badgeContent={1} color="error">
                <Notifications />
              </Badge>
            </div>
            <div style={{ width: "10%" }}></div>
            <div className="pt-2">
              <Link to={`/profile/${user?.username}`}>
                <img
                  src={
                    user && user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "noUserImage.png"
                  }
                  alt=""
                  style={{ height: "32px", width: "32px" }}
                  className="rounded-circle"
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
