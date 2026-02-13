import { AlertCircleIcon } from "@/components/Icons";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

export default function TicketsOverviewModal() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const openedTicketsCount = 10;
  const newTicketsCount = 5;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-[0.72]" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-[352px] transform overflow-hidden rounded-xl border  border-[#EAECF0] bg-white p-6 text-center text-sm custom-shadow transition-all">
                <div className="mb-2 flex items-center justify-center">
                  <AlertCircleIcon
                    className="h-12 w-12 text-primary-200"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Tickets Overview
                  </DialogTitle>
                </div>

                <p className="mt-4 text-[#344054]">
                  There are currently {openedTicketsCount} opened ticket tickets
                  awaiting your action.
                </p>
                <p className="mt-2 text-[#344054]">
                  You can choose to focus on resolving the open tickets or
                  review the newly added ones to ensure all issues are addressed
                  promptly. Please select an option to continue.
                </p>

                <div className="mt-5 grid grid-rows-2 gap-5 text-base">
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate(`/tickets/open`);
                    }}
                    className="flex h-11 items-center justify-center rounded-lg border border-primary-600 bg-primary-600 py-2.5 text-center font-semibold text-white transition-colors duration-100 disabled:bg-gray-300 cursor-pointer"
                  >
                    View opened tickets ({openedTicketsCount})
                  </button>
                  {newTicketsCount > 0 ? (
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate(`/tickets/new`);
                      }}
                      className="flex h-11 items-center justify-center rounded-lg border border-gray-300 py-3 text-center font-semibold text-gray-700 cursor-pointer"
                      type="button"
                    >
                      View new tickets ({newTicketsCount})
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="flex h-11 items-center justify-center rounded-lg border border-gray-300 py-3 text-center font-semibold text-gray-700"
                      type="button"
                    >
                      Close
                    </button>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
