import React, { useEffect, useState } from "react";
import "./SignUp.css";
import "./mediaSignUp.css";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";

export default function SignUp() {
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonNumber, setPhonNumber] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValid, setIsValid] = useState(false)

  let newUserInfo = {
    name,
    lastName,
    phone: phonNumber,
    gmail,
    password,
  };

  let SignUpUserHandler = (event) => {
    event.preventDefault();

    fetch("https://giahland-api.vercel.app/api/auth/register", {
      method: "POST",
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 40);
        document.cookie = `session=${data.token
          }; path=/; Secure; SameSite=Strict; Expires=${expirationDate.toUTCString()};`;

        redirect('/')
      });

    if (name.length && lastName.length && phonNumber.length && gmail.length && password.length != 0) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }

    setName('')
    setLastName('')
    setPhonNumber('')
    setGmail('')
    setPassword('')

  };

  useEffect(() => {

    if (isValid) {
      navigate('/userDashboard')
    }

  }, [isValid])

  return (
    <div className="container">
      <form className="form-sign-up">
        <div className="container-img-sign-up">
          <img
            src="/Imgs/img-form.png"
            className="img-sign-up"
          />
        </div>

        <div className="container-inputs">
          <h3 className="title-form">ثبت نام</h3>

          <input
            type="text"
            className="inputs-login"
            placeholder="نام"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <FaRegUser size={20} className="icon-input-login" />

          <input
            type="text"
            className="inputs-login"
            placeholder="نام خانوادگی"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <FaUserTie size={20} className="icon-input-login" />

          <input
            type="text"
            className="inputs-sign-up"
            placeholder="شماره موبایل"
            value={[phonNumber]}
            onChange={(event) => setPhonNumber(event.target.value)}
          />
          <IoPhonePortraitOutline size={20} className="icon-input-sign-up" />

          <input
            type="email"
            className="inputs-sign-up"
            placeholder="ایمیل"
            value={gmail}
            onChange={(event) => setGmail(event.target.value)}
          />
          <MdOutlineMailOutline size={20} className="icon-input-sign-up" />

          <input
            type="password"
            className="inputs-sign-up"
            placeholder="تعریف رمز عبور"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <MdKey size={20} className="icon-input-sign-up" />

          <button className="btn-sign-up" onClick={SignUpUserHandler}>
            ثبت نام
          </button>

          <p className="link-go-to-login">
            حساب کاربری دارید؟{" "}
            <Link to={"/Login"} className="Link-go-to-sign-in">
              ورود
            </Link>{" "}
            کنید
          </p>
        </div>
      </form>
    </div>
  )
}