import "../CSS/login.css";
import { Link, useNavigate } from "react-router-dom";
import BtnLink from "./BtnLink";
import { useState } from "react";
import axios from "axios";
import BASE_API_URL from "../server/serves";
function LoginCom() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [res, SetRes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://agazatyapi.runasp.net/api/Account/UserLogin`,
        {
          userName: userName,
          password: password,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      SetRes(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.id);
      localStorage.setItem("UserData", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "فشل تسجيل الدخول، حاول مرة أخرى"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="wordLogin">
          <h4 className="text-center text-head">تسجيل الدخول</h4>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="exampleInputUserName" className="form-label">
            اسم المستخدم
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
            id="exampleInputUserName"
            placeholder="30201241234567"
            required
            maxLength={14}
            minLength={14}
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="exampleInputPassword1" className="form-label">
            كلمة المرور
          </label>
          <div className="position-relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="********"
              required
            />
            <i className="fa fa-lock password-icon"></i>
          </div>

          <Link
            to={"/login/forgetpassword"}
            className="form-text text-primary forgetPassword"
          >
            هل نسيت كلمة المرور؟
          </Link>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "جاري التحميل..." : "تسجيل الدخول"}
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginCom;
