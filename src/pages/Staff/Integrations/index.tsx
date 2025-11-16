import { Link } from "react-router";
import {
  AtSymbolIcon,
  CalendarIcon,
  CreditCardCheckIcon,
  FileCheck03Icon,
  HelpCircleIcon,
  Key01Icon,
  Mail02Icon,
  MessageChatSquareIcon,
  PhoneCall01Icon,
  SearchLgIcon,
  VideoRecorderIcon,
} from "@/components/Icons";
import ToggleButton from "@/components/ToggleButton";

export default function StaffIntegrationsPage() {
  const integrations = [
    {
      name: "Livestream Integration",
      Icon: VideoRecorderIcon,
      variant: "red",
      description:
        "Adjust settings like preferred video conferencing app meeting links, access permissions, and default options.",
    },
    {
      name: "SMS Integration",
      Icon: MessageChatSquareIcon,
      variant: "normal",
      description:
        "Adjust settings such as SMS provider, delivery options, and student contact preferences.",
    },
    {
      name: "Access Card Integration",
      Icon: Key01Icon,
      variant: "normal",
      description:
        "Simplify access control and focus on providing a secure experience with our integrated access card system.",
    },
    {
      name: "PDF Integration",
      Icon: FileCheck03Icon,
      variant: "normal",
      description:
        "Adjust settings such as PDF provider, document uploads, access permissions, and download options for better resource sharing.",
    },
    {
      name: "Payment Gateway",
      Icon: CreditCardCheckIcon,
      variant: "normal",
      description:
        "Integrate Stripe for secure and seamless payment processing, setting up custom settings for tuition payments, and invoicing.",
    },
    {
      name: "Email Integration",
      Icon: Mail02Icon,
      variant: "normal",
      description:
        "Set up and manage the email provider for sending class updates, announcements, and reminders.",
    },
    {
      name: "VoIP Integration",
      Icon: PhoneCall01Icon,
      variant: "red",
      description:
        "Set up VoIP services for voice communication within your platform. Configure call settings, for a streamlined, real-time communication.",
    },
    {
      name: "WhatsApp Integration",
      Icon: PhoneCall01Icon,
      variant: "red",
      description:
        "Connect WhatsApp to send class updates, reminders, and announcements directly to students.",
    },
    {
      name: "Calendar Integration",
      Icon: CalendarIcon,
      variant: "normal",
      description:
        "Sync your class schedule with external calendars like Google or Outlook for upcoming classes and important deadlines.",
    },
    {
      name: "Social Media Integration",
      Icon: AtSymbolIcon,
      variant: "normal",
      description:
        "Connect your platform with channels like Facebook, Twitter, or LinkedIn to share events directly to your social media accounts.",
    },
  ];

  return (
    <div className="bg-primary-50 h-screen p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <header className="flex items-center justify-between">
          <h2 className="rounded-t-lg text-xl font-semibold text-gray-900">
            Integrations
          </h2>
          <Link to={"/help"}>
            <HelpCircleIcon className="h-6 w-6 text-black" />
          </Link>
        </header>
        <div className="mt-6 flex justify-end">
          <div className="ring-primary-600 flex max-w-xs grow items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus-within:border-transparent focus-within:ring-2">
            <SearchLgIcon className="h-4 w-4 text-black" />
            <input
              type="text"
              className="placeholder:text-normal grow placeholder:text-gray-800 focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        <hr className="mt-4 border-gray-200" />
        <div className="mt-10">
          <h4 className="text-base font-semibold text-gray-800">
            Available Integrations (9/12)
          </h4>
          <div className="mt-4 grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {integrations.map((i) => (
              <div
                className="rounded-lg border border-gray-200 p-4"
                key={i.name}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2 ${
                        i.variant === "red"
                          ? "bg-red-50 text-red-500"
                          : "bg-primary-50 text-primary-500"
                      }`}
                    >
                      <i.Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {i.name}
                    </p>
                  </div>
                  <ToggleButton />
                </div>
                <p className="mt-4 text-xs font-normal text-gray-800">
                  {i.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
