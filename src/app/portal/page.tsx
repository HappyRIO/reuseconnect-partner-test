import { redirect } from "next/navigation";
import { PortalEmbed } from "@/components/PortalEmbed";
import { getCurrentUser } from "@/lib/auth";

export default async function PortalPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <PortalEmbed
      userLabel={`${user.firstName} ${user.lastName} (${user.email})`}
    />
  );
}
