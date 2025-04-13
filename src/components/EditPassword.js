import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from "../Images/download.jpeg";
import axios from "axios";
import BASE_API_URL from "../server/serves";

function EditPassword() {
  const userID = localStorage.getItem("userID");
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userID]);

  const navigate = useNavigate();
  const [updatedFields, setUpdatedFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Show/Hide password toggles
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (key) => {
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!userID) {
      setError("لم يتم العثور على معرف المستخدم، قم بتسجيل الدخول أولاً");
      setLoading(false);
      return;
    }

    if (updatedFields.newPassword !== updatedFields.confirmNewPassword) {
      setError("كلمة المرور الجديدة وتأكيدها غير متطابقتين");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}api/Account/Change-Password`,
        {
          useId: userID,
          currentPassword: updatedFields.currentPassword,
          newPassword: updatedFields.newPassword,
          confirmNewPassword: updatedFields.confirmNewPassword,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "فشل تغيير كلمة المرور، حاول مرة أخرى"
      );
      console.error("Change Password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex mb-4">
        <div className="zzz d-inline-block p-3 ps-5">
          <h2 className="m-0">تعديل كلمة المرور</h2>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex row align-items-center">
            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-4 col-xxl-3 mt-4">
              <div className="p-3 justify-content-center text-center">
                <img
                  src={Image}
                  className="rounded-circle w-50 img-responsive"
                  alt="profilePicture"
                />
              </div>
              <div className="d-flex justify-content-center">
                <div className="bg-info p-2 d-inline-block rounded-3">
                  <h5 className="m-0 ps-5 pe-5 text-light">
                    {user.roleName || "جاري التحميل..."}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7 col-xl-8 col-xxl-9 mt-4">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="row">
                {/* current password */}
                <div className="col-sm-12 col-md-6 col-lg-6 mb-3 position-relative">
                  <label
                    htmlFor="exampleInputCurrentPassword"
                    className="form-label"
                  >
                    كلمة المرور الحالية
                  </label>
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={updatedFields.currentPassword}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputCurrentPassword"
                    placeholder="********"
                    required
                  />
                  <i
                    className={`fa ${
                      showPasswords.current ? "fa-eye-slash" : "fa-eye"
                    } password-icon`}
                    onClick={() => togglePassword("current")}
                  ></i>
                </div>

                {/* new password */}
                <div className="col-sm-12 col-md-6 col-lg-6 mb-3 position-relative">
                  <label
                    htmlFor="exampleInputNewPassword"
                    className="form-label"
                  >
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={updatedFields.newPassword}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputNewPassword"
                    placeholder="********"
                    required
                  />
                  <i
                    className={`fa ${
                      showPasswords.new ? "fa-eye-slash" : "fa-eye"
                    } password-icon`}
                    onClick={() => togglePassword("new")}
                  ></i>
                </div>

                {/* confirm new password */}
                <div className="col-sm-12 col-md-6 col-lg-6 mb-3 position-relative">
                  <label
                    htmlFor="exampleInputConfirmNewPassword"
                    className="form-label"
                  >
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmNewPassword"
                    value={updatedFields.confirmNewPassword}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputConfirmNewPassword"
                    placeholder="********"
                    required
                  />
                  <i
                    className={`fa ${
                      showPasswords.confirm ? "fa-eye-slash" : "fa-eye"
                    } password-icon`}
                    onClick={() => togglePassword("confirm")}
                  ></i>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="btn btn-primary w-50"
                disabled={loading}
              >
                {loading ? "جاري التحديث..." : "تحديث البيانات"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
