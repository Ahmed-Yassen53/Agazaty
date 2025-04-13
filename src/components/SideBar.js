import { Link, useLocation } from "react-router-dom";
import "../CSS/SideBar.css";
import "../CSS/LinkSideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCalendarPlus,
  faHandshake,
  faUsersRectangle,
  faUsers,
  faFolderOpen,
  faCalendarDays,
  faCircleQuestion,
  faGear,
  faRightFromBracket,
  faScroll,
  faHouseMedicalCircleCheck,
  faCircleH,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

function SideBar() {
  const location = useLocation();
  const userID = localStorage.getItem("userID");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [leavesWating, setLeavesWating] = useState([]);
  const [leavesWatingForDirect, setLeavesWatingForDirect] = useState([]);
  const [leavesWatingForGeneral, setLeavesWatingForGeneral] = useState([]);
  const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);
  const [waitingCertifiedSickLeaves, setWaitingCertifiedSickLeaves] = useState(
    []
  );
  const [user, setUser] = useState({});
  const userRole = user.roleName;

  useEffect(() => {
    fetch(
      `http://agazatyapi.runasp.net/api/NormalLeave/WaitingByCoWorkerID/${userID}`
    )
      .then((res) => res.json())
      .then((data) => setLeavesWating(data));
  }, [userID]);

  useEffect(() => {
    fetch(
      `http://agazatyapi.runasp.net/api/NormalLeave/WaitingByDirect_ManagerID/${userID}`
    )
      .then((res) => res.json())
      .then((data) => setLeavesWatingForDirect(data));
  }, [userID]);

  useEffect(() => {
    fetch(
      `http://agazatyapi.runasp.net/api/NormalLeave/WaitingByGeneral_ManagerID/${userID}`
    )
      .then((res) => res.json())
      .then((data) => setLeavesWatingForGeneral(data));
  }, []);

  useEffect(() => {
    fetch(`http://agazatyapi.runasp.net/api/SickLeave/GetAllWaitingSickLeaves`)
      .then((res) => res.json())
      .then((data) => setWaitingSickLeaves(data));
  }, []);

  useEffect(() => {
    fetch(
      `http://agazatyapi.runasp.net/api/SickLeave/GetAllWaitingCertifiedSickLeaves`
    )
      .then((res) => res.json())
      .then((data) => setWaitingCertifiedSickLeaves(data));
  }, []);

  useEffect(() => {
    fetch(`http://agazatyapi.runasp.net/api/Account/GetUserById/${userID}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userID]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const renderLink = (
    title,
    icon,
    link,
    roles,
    extraClass = "",
    hasBadge = false,
    badgeCount = 0
  ) => {
    const rolesArray = roles.split(",").map((role) => role.trim());
    if (!rolesArray.includes(userRole)) return null;

    return (
      <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
        <li
          className={`link-SideBar ${extraClass} ${
            location.pathname === link ? "active-link" : ""
          } tran position-relative`}
        >
          <FontAwesomeIcon
            icon={icon}
            className="col-sm-12 col-xxl-2 pl-5"
            style={{ fontSize: "1.6em" }}
          />
          <span className="col-xl-8 d-none d-xxl-block">{title}</span>
          <span className="tooltip-text d-block d-xxl-none">{title}</span>
          {hasBadge && badgeCount > 0 && (
            <span
              className="badge bg-danger text-white rounded-circle position-absolute"
              style={{
                top: "5px",
                right: "5px",
                fontSize: "12px",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {badgeCount}
            </span>
          )}
        </li>
      </Link>
    );
  };

  const renderLink11 = (
    title,
    icon,
    link,
    roles,
    extraClass = "",
    hasBadge = false,
    badgeCount = 0
  ) => {
    const rolesArray = roles.split(",").map((role) => role.trim());
    if (!rolesArray.includes(userRole)) return null;

    return (
      user.isDirectManager && (
        <Link to={link} className={`link-SideBar ${extraClass}`} key={link}>
          <li
            className={`link-SideBar ${extraClass} ${
              location.pathname === link ? "active-link" : ""
            } tran position-relative`}
          >
            <FontAwesomeIcon
              icon={icon}
              className="col-sm-12 col-xxl-2 pl-5"
              style={{ fontSize: "1.6em" }}
            />
            <span className="col-xl-8 d-none d-xxl-block">{title}</span>
            <span className="tooltip-text d-block d-xxl-none">{title}</span>
            {hasBadge && badgeCount > 0 && (
              <span
                className="badge bg-danger text-white rounded-circle position-absolute"
                style={{
                  top: "5px",
                  right: "5px",
                  fontSize: "12px",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {badgeCount}
              </span>
            )}
          </li>
        </Link>
      )
    );
  };

  const renderLink2 = (title, link, roles, extraClass = "") => {
    const rolesArray = roles.split(",").map((role) => role.trim());
    if (!rolesArray.includes(userRole)) return null;

    return (
      <Link to={link} className={`link-SideBar2 ${extraClass}`} key={link}>
        <ul
          className={`p-0 ${extraClass} ${
            location.pathname === link ? "active-link" : ""
          } tran`}
        >
          <li className="d-none d-xxl-block">{title}</li>
        </ul>
      </Link>
    );
  };

  const renderLink3 = (title, link, roles, extraClass = "") => {
    const rolesArray = roles.split(",").map((role) => role.trim());
    if (!rolesArray.includes(userRole)) return null;

    return (
      <Link to={link} className={`link-SideBar3 ${extraClass}`} key={link}>
        <ul
          className={`p-0 ${extraClass} ${
            location.pathname === link ? "active-link" : ""
          } tran`}
        >
          <li className="d-none d-xxl-block">{title}</li>
        </ul>
      </Link>
    );
  };

  return (
    <div className="pt-3 SideBar">
      <div>
        <Link
          to={"/about"}
          className="Agazaty d-flex text-center text-primary"
          title="معلومات عن النظام"
        >
          اجازاتي
        </Link>
      </div>
      <div>
        <ul className="list-unstyled p-0 pt-2">
          {renderLink(
            "الرئيسية",
            faHouse,
            "/",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}
          {renderLink(
            "الملف الشخصي",
            faUser,
            "/profile",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}

          {userRole !== "عميد الكلية" && (
            <Link className="link-SideBar">
              <li
                className="link-SideBar"
                onClick={() => toggleDropdown("leave")}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faCalendarPlus}
                  className="col-sm-12 col-xxl-2 pl-5"
                  style={{ fontSize: "1.6em" }}
                />
                <span className="col-xl-8 d-none d-xxl-block">طلب إجازة</span>
                <span className="tooltip-text d-block d-xxl-none">
                  طلب إجازة
                </span>
              </li>
            </Link>
          )}
          {activeDropdown === "leave" && (
            <ul className="list-unstyled pl-4 d-none d-xxl-block">
              {renderLink2(
                "اعتيادية",
                "/normal-leave",
                "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
              )}
              {renderLink2(
                "عارضة",
                "/casual-leave",
                "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
              )}
              {renderLink2(
                "مرضية",
                "/sick-leave",
                "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
              )}
            </ul>
          )}

          {renderLink(
            "طلبات القيام بالعمل",
            faHandshake,
            "/messages",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف",
            "",
            true,
            leavesWating.length
          )}

          {userRole !== "عميد الكلية" && (
            <Link className="link-SideBar">
              <li
                className="link-SideBar"
                onClick={() => toggleDropdown("leavesUser")}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="col-sm-12 col-xxl-2 pl-5"
                  style={{ fontSize: "1.6em" }}
                />
                <span className="col-xl-8 d-none d-xxl-block">اجازاتي</span>
                <span className="tooltip-text d-block d-xxl-none">اجازاتي</span>
              </li>
            </Link>
          )}
          {activeDropdown === "leavesUser" && (
            <ul className="list-unstyled pl-4 d-none d-xxl-block">
              {renderLink2(
                "اعتيادية",
                "/agazaty/normal",
                "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
              )}
              {renderLink2(
                "عارضة",
                "/agazaty/casual",
                "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
              )}
              {renderLink2(
                "مرضية",
                "/agazaty/sick",
                "أمين الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
              )}
            </ul>
          )}

          {renderLink(
            "الأقسام",
            faUsersRectangle,
            "/departments",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
          )}

          {(userRole === "عميد الكلية" ||
            userRole === "مدير الموارد البشرية") && (
            <Link className="link-SideBar">
              <li
                className="link-SideBar"
                onClick={() => toggleDropdown("employees")}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="col-sm-12 col-xxl-2 pl-5"
                  style={{ fontSize: "1.6em" }}
                />
                <span className="col-xl-8 d-none d-xxl-block">الموظفين</span>
                <span className="tooltip-text d-block d-xxl-none">
                  الموظفين
                </span>
              </li>
            </Link>
          )}
          {activeDropdown === "employees" && (
            <ul className="list-unstyled pl-4 d-none d-xxl-block">
              {renderLink2(
                "الموظفين النشطين",
                "/employees/active",
                "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
              )}
              {renderLink2(
                "الموظفين غير النشطين",
                "/employees/inactive",
                "أمين الكلية, عميد الكلية, مدير الموارد البشرية"
              )}
            </ul>
          )}

          {(userRole === "عميد الكلية" ||
            userRole === "مدير الموارد البشرية") && (
            <Link className="link-SideBar">
              <li
                className="link-SideBar"
                onClick={() => toggleDropdown("leaves")}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className="col-sm-12 col-xxl-2 pl-5"
                  style={{ fontSize: "1.6em" }}
                />
                <span className="col-xl-8 d-none d-xxl-block">
                  سجل الاجازات
                </span>
                <span className="tooltip-text d-block d-xxl-none">
                  سجل الاجازات
                </span>
              </li>
            </Link>
          )}
          {activeDropdown === "leaves" && (
            <ul className="list-unstyled pl-4 d-none d-xxl-block">
              {renderLink3(
                "اعتيادية",
                "/des-requests/normal",
                "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
              )}
              {renderLink3(
                "عارضة",
                "/des-requests/casual",
                "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
              )}
              {renderLink3(
                "مرضية",
                "/des-requests/sick",
                "أمين الكلية, مدير الموارد البشرية, عميد الكلية"
              )}
              {renderLink3(
                "تصاريح",
                "/des-requests/permit",
                "مدير الموارد البشرية"
              )}
            </ul>
          )}

          {renderLink11(
            "طلبات الاجازات",
            faFolderOpen,
            "/leave-record",
            "هيئة تدريس",
            "",
            true,
            leavesWatingForDirect.length
          )}
          {renderLink(
            "طلبات الاجازات",
            faFolderOpen,
            "/general/leave-record",
            "أمين الكلية, عميد الكلية",
            "",
            true,
            leavesWatingForGeneral.length
          )}
          {renderLink(
            "الاستفسارات",
            faCircleQuestion,
            "/inquiries",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}
          {renderLink(
            "الاعدادات",
            faGear,
            "/sitting",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدریس, موظف"
          )}
          {renderLink("التصريحات", faScroll, "/permit", "مدير الموارد البشرية")}
          {renderLink(
            "معلومات عامة",
            faCircleExclamation,
            "/about",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف"
          )}
          {renderLink(
            "سجل الاجازات المرضية",
            faCircleH,
            "/sick-leaves-record",
            "مدير الموارد البشرية"
          )}
          {renderLink(
            "تحديث الاجازة المرضية",
            faHouseMedicalCircleCheck,
            "/sick-leaves-record2",
            "مدير الموارد البشرية",
            "",
            true,
            waitingSickLeaves.length + waitingCertifiedSickLeaves.length
          )}
          {renderLink(
            "الخروج",
            faRightFromBracket,
            "/login",
            "أمين الكلية, عميد الكلية, مدير الموارد البشرية, هيئة تدريس, موظف",
            "text-danger hover-danger"
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
