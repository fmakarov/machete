import React, { useContext } from "react";

import AuthPortal from "../components/auth/AuthPortal";
import SettingsPortal from "../components/settings/SettingsPortal";
import { UserContext } from "../contexts";
import Layout from "./layout";

export default function Account() {
  const { user } = useContext(UserContext);

  return (
    <Layout>
      {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
    </Layout>
  );
}
