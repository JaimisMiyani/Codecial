import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import { AuthContext } from "../../Context/AuthContext";
import { useState, useContext, useRef } from "react";
import axios from "axios";

export default function Share() {
  const [file, setFile] = useState(null);
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { userId: user._id, desc: desc.current.value };
    if (file) {
      let dummyData = new FormData();
      const filename = Date.now() + file.name;
      dummyData.append("file", file);
      dummyData.append("name", filename);
      newPost.img = filename;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        await axios.post("/upload", dummyData, config);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
    } catch (err) {
      console.log("Share file error", err);
    }
  };

  return (
    <>
      <div
        className="card mt-3 mb-5"
        style={{
          width: "100%",
          boxShadow: "0px 0px 16px -8px rgb(0, 0, 0, 0.6)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="d-flex my-2 ml-3">
            <img
              src={
                user.profilePicture ? PF + user.profilePicture : PF + "15.png"
              }
              alt=""
              style={{ height: "60px", width: "60px" }}
              className="rounded-circle"
            ></img>
            <div style={{ width: "15px" }}></div>
            <div className="d-flex align-items-center" style={{ width: "85%" }}>
              <input
                placeholder={`What's in your mind ${user.username}?`}
                className="form-control border-0"
                ref={desc}
              />
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-around">
            <div
              className="d-flex justify-content-around mt-1 mb-3 ml-2"
              style={{ width: "70%" }}
            >
              <label
                htmlFor="file"
                className="d-flex align-items-center mt-2"
                style={{ cursor: "pointer" }}
              >
                <PermMedia htmlColor="tomato" />
                <span className="pl-2">Photo or Video</span>
                <input
                  className="d-none"
                  type="file"
                  id="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="d-flex align-items-center">
                <Label htmlColor="blue" />
                <span className="pl-2">Tag</span>
              </div>
              <div className="d-flex align-items-center">
                <Room htmlColor="green" />
                <span className="pl-2">Location</span>
              </div>
              <div className="d-flex align-items-center">
                <EmojiEmotions htmlColor="goldenrod" />
                <span className="pl-2">Feelings</span>
              </div>
            </div>
            <div className="bg-warning mt-1 mb-3" style={{ width: "10%" }}>
              <button
                type="submit"
                className="btn btn-success btn-block rounded-4"
              >
                Share
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
