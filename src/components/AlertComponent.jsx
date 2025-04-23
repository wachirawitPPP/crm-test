"use client";

const AlertComponent = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-shadow">
          <div className="modal-body">
            <div className="d-flex justify-content-center">
              <svg
                className="w-25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="24" height="24" fill="white"></rect>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
                    fill="#00AD98"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <label
                htmlFor="message-text"
                className="col-form-label font-15 pb-0"
                style={{ color: "#00AD98" }}
              >
                {message}
              </label>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success bth-login-success w-full text-white"
                style={{ backgroundColor: "#00AD98", width: "250px" }}
                onClick={onClose}
              >
               <span className="text-white">ยืนยัน</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
