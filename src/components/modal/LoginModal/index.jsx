import { useState } from 'react';

function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    // ปิด Modal
    setShowModal(false);

    // แสดง Alert หลังจากปิด Modal
    setShowAlert(true);

    // ซ่อน Alert หลังจาก 3 วินาที
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Open Login Modal
      </button>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <h5 className="modal-title font-15 mt-2" id="exampleModalLabel" style={{ color: '#00AD98' }}>
                  ยืนยันการเข้าร่วมต่อข้อมูล
                </h5>
                <hr className="border-2 rounded-sm opacity-100 my-4" style={{ borderColor: '#D9D9D9' }} />
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label font-15 pb-0" style={{ color: '#00AD98' }}>
                      เลขบัตรประจำตัวประชาชน <span style={{ color: '#FD7972' }}>*</span>
                    </label>
                    <input type="text" className="form-control login" id="recipient-name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label font-15 pb-0" style={{ color: '#00AD98' }}>
                      หมายเลขโทรศัพท์มือถือ <span style={{ color: '#FD7972' }}>*</span>
                    </label>
                    <input type="text" className="form-control login" id="message-text" />
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <a href="/condition">
                  <button type="button" className="btn btn-outline-primary bth-login-success px-5 me-3">
                    ยืนยัน
                  </button>
                </a>
                <button
                  type="button"
                  className="btn btn-outline-secondary bth-login-danger px-5 ms-3"
                  onClick={() => setShowModal(false)}
                  data-bs-dismiss="modal"
                >
                  ยกเลิก
                </button>
              </div>
              <div className="text-center mt-4 mb-3">
                <span style={{ fontSize: '10px', color: '#00AD98' }}>
                  ข้อกำหนดการให้บริการ <strong>.</strong> นโยบายความเป็นส่วนตัว
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="alert alert-success" role="alert" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          Login successful!
        </div>
      )}
    </>
  );
}

export default LoginModal;
