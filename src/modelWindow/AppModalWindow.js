import "./appWindowModel.css";
import { useEffect, useState } from "react";
const AppModalWindow = ({ modalWindow }) => {
  const [hideModal, setHideModal] = useState(false);

  useEffect(() => {
    // if (!sessionStorage.popupModal) {
    const timer = setTimeout(() => {
      setHideModal(true);
      // sessionStorage.popupModal = 1;
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`overlay`}>
      <div className={`modal ${hideModal ? "active" : ""}`}>
        <div className="modal__close" onClick={() => setHideModal(false)}>
          &times;
        </div>
        <div className="modal__descr">
          Просто слушайте и считайте овечек 😆🤣
        </div>
      </div>
    </div>
  );
};

export default AppModalWindow;
