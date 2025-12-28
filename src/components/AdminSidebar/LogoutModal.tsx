import { useAuthDispatchContext } from "@/context/auth";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router";

export default function LogoutModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const authDispatch = useAuthDispatchContext();
  const navigate = useNavigate();

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-white/5 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold text-black">
                Log Out
              </DialogTitle>
              <p className="mt-2 text-base text-gray-700">
                Are you sure you want to log out? Any unsaved changes may be
                lost.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button
                  className="cursor-pointer rounded-lg border border-gray-300 py-2 text-sm font-semibold"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary-600 cursor-pointer rounded-lg py-2 text-sm font-semibold text-white"
                  onClick={() => {
                    authDispatch({
                      type: "LOGOUT",
                      payload: { user_id: 0, token: "", role: "" },
                    });
                    navigate("/login");
                  }}
                >
                  Yes, I'm Sure
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
