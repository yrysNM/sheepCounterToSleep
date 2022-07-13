import "./appWindowModel.css";
import { useEffect, useState } from "react";
const AppModalWindow = ({ modalWindow }) => {
  const [hideModal, setHideModal] = useState(false);

  useEffect(() => {
    // if (!sessionStorage.popupModal) {
    const timer = setTimeout(() => {
      setHideModal(true);
      // sessionStorage.popupModal = 1;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`overlay`}>
      <div className={`modal ${hideModal ? "active" : ""}`}>
        <div className="modal__close" onClick={() => setHideModal(false)}>
          &times;
        </div>
        <div className="modal__descr">
          Become a shepherd online, feel your useless
        </div>
      </div>
    </div>
  );
};

export default AppModalWindow;
