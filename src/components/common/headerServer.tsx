import { getUser } from "@/lib/actions/getUser.action";
import HeaderClient from "./headerClient";

export default async function HeaderServer() {
  const user = await getUser();
  return <HeaderClient email={user?.email || ""} />;
}
