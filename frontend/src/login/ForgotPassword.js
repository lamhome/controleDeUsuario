import { useState } from "react";
import { Link } from "react-router-dom";
import lamIMG from "./../assets/images/lg_lamtech.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Um email com as instruções de acesso foi enviado para sua conta.");
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        {message ? (
          <>
            <div className="login-form-message">{message}</div>
            <div className="container-login-form-btn">
              <Link className="login-form-btn" to="/">Fechar</Link>
            </div>
          </>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Recuperar Senha</span>

            <span className="login-form-title">
              <img src={lamIMG} alt="LAMTech" />
            </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Enviar</button>
            </div>

            <div className="text-center">
              <Link className="txt3" to="/">Voltar</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;