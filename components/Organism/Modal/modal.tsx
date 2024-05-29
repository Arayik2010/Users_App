import { IModal } from "@/interface/modal";
import shadows from "@mui/material/styles/shadows";
import zIndex from "@mui/material/styles/zIndex";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    background: 'rgba(1, 11, 10, 0.58)',
    zIndex: 1

  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "auto",
    height: "250px",
    marginRight: "-50%",
    border: "2px solid silver",
    transform: "translate(-50%, -50%)",
  },


};

const UserModal = ({
  modalIsOpen,
  contentTitle,
  closeModal,
  handlerRequest,
  showHandleButtons,
  handleDeleteButton,
  handleDeclineButton,
  onlyConfirmButton,
  deleteButtonClass,
  declineButtonClass,
  closeRequestModal,
  id

}: IModal) => {
  return (
    <div>
      {" "}
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-center">
          <Image
            className="m-auto"
            src="/success_img.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <h2 className="text-success_text font-medium text-xl m-auto">Success</h2>
          <p className="mt-4 text-modal_title font-medium">{contentTitle}</p>
        </div>
        <div className="text-center">
          {showHandleButtons ?
            <div className="flex  mt-6 px-6 gap-4 ">
              <div><button onClick={closeRequestModal} className={`border m-auto rounded-md ${declineButtonClass}`}>{handleDeclineButton}</button></div>
              <div><button onClick={(id) => handlerRequest(id)} className={`border m-auto rounded-md ${deleteButtonClass}`}>{handleDeleteButton}</button></div>
            </div> : null
          }
          {onlyConfirmButton ? (
            <button
              className="bg-[#0A214A] rounded-md text-white px-32 mt-4 m-auto py-1"
              onClick={(id) => handlerRequest(id)}
            >
              Continue
            </button>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};
export default UserModal;
