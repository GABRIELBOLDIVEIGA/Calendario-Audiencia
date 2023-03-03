import { useContext } from "react";
// import { useHistory } from "react-router-dom";
import { CalendarAPIContext } from "common/Context/CalendarAPI";

export default function Login() {
    // const history = useHistory();
    const { login, atualizaToken } = useContext(CalendarAPIContext);

    return (
        <section>
            <h1>Login</h1>
            <button onClick={login}>Login</button>
            <button onClick={atualizaToken}>Atualizar Token</button>
        </section>
    );
}
