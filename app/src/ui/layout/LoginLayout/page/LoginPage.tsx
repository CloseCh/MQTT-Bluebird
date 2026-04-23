import { ConnectionForm } from "@/features/brockerConnection";
import { useConnectionContext } from "@/features/brockerConnection/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  
  const { success, handleConnection } = useConnectionContext();

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success]);

  return (
    <>
      <ConnectionForm handleConnection={handleConnection}/>
    </>
  )
}

export default LoginPage;