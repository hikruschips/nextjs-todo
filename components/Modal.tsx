import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal(props: ModalProps) {
  const { setOpenModal } = props;
  const [_document, set_document] = useState(document);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  // useEffect(() => {
  //   set_document(document);
  // }, []);

  if (Object.keys(_document).length === 0) {
    return null;
  }
  return ReactDom.createPortal(
    <div className="fixed w-screen h-screen top-0 left-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col">
      <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
        <h1 className="font-extrabold text-2xl sm:text-5xl select-none">
          MENU
        </h1>
        <FontAwesomeIcon
          onClick={() => setOpenModal(false)}
          className="duration-300 hover:rotate-90 text-lg sm:text-3xl cursor-pointer"
          icon={faXmark}
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h2
          onClick={() => {
            handleSignOut();
            setOpenModal(false);
          }}
          className="select-none duration-300 hover:pl-2 cursor-pointer"
        >
          Logout
        </h2>
      </div>
    </div>,
    _document.getElementById("portal")!
  );
}

export default Modal;
