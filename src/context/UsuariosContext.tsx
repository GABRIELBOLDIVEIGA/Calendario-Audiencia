import { createContext, useContext, useState } from "react";

type T = {
    usuarios: Usuario[],
    setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>
}

interface Usuario {
    nome: string, 
    email: string
}

const DEFAULT_VALUE = {
    usuarios: [{ 
        nome: "", 
        email: "" 
    }],
    setUsuarios: () => {},
}

const UsuariosContext = createContext<T>(DEFAULT_VALUE);
UsuariosContext.displayName = "UsuariosContext";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

export const UsuariosProvider = ({ children }: Props) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    return (
        <UsuariosContext.Provider value={{ usuarios, setUsuarios }} >
            {children}
        </UsuariosContext.Provider>
    )
}

export const useUsuariosContext = () => {
    const usuariosContext = useContext(UsuariosContext);
    const { usuarios, setUsuarios} = usuariosContext;

    // useEffect(() => {
    //     fetch(`https://my-json-server.typicode.com/CivelVitoria/.db/usuarios`)
    //         .then((resposta) => resposta.json())
    //         .then((dados) => {
    //             setUsuarios(dados);
    //         });
    // }, [])

    return {usuarios, setUsuarios};
}