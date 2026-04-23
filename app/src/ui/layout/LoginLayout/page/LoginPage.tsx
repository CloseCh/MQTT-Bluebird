import { ConnectionForm } from "@/features/brockerConnection";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  debugger
  const handleLogin = async () => {
    // tu lógica de autenticación...
    const success = true;

    if (success) {
      navigate('/'); // redirige a MainLayout
    }
  };
  
  return (
    <>
      <ConnectionForm />
    </>
  )
}

export default LoginPage;