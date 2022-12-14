import { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import Alerta from "../component/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});


  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
        console.log(error)
      }
      setCargando(false);
    };
    return ()=> confirmarCuenta()
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Confirma tu Cuenta y Comienza a Administrar {""}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {!cargando && <Alerta alerta={alerta} />}

      {cuentaConfirmada &&(
         <Link
         className="block text-center font-bold my-5 text-gray-500"
         to="/"
       >
         Iniciar Sesion{" "}
       </Link>
      )}

      </div>
      
      
      
    </>

  );
};

export default ConfirmarCuenta;
