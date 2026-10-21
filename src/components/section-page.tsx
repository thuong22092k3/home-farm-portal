import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { CommonMessages, Locale } from "@/i18n/resources";

export function SectionPage({
  title,
  description,
  icon: Icon,
  locale,
  messages
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  locale: Locale;
  messages: CommonMessages;
}) {
  return (
    <section className="portal-rise mx-auto max-w-[1320px]">
      <div className="flex items-end justify-between border-b border-[#dfe2d4] pb-7">
        <div>
          <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-[#e4efd4] text-[#347858]">
            <Icon className="size-6" />
          </span>
          <h1 className="text-4xl font-black tracking-[-.05em]">{title}</h1>
          <p className="mt-2 text-[#718078]">{description}</p>
        </div>
      </div>
      <div className="grid min-h-[420px] place-items-center text-center">
        <div>
          <div className="mx-auto h-16 w-px bg-[#cbd8c3]" />
          <p className="mt-5 max-w-md text-lg font-semibold text-[#52665c]">{messages.pageComingSoon}</p>
          <Link href={`/${locale}/dashboard`} className="mt-6 inline-flex h-11 items-center rounded-xl bg-[#143f30] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#205740]">
            {messages.backDashboard}
          </Link>
        </div>
      </div>
    </section>
  );
}
